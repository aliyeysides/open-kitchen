import { useState, useRef } from 'react';
import { MutationResult, useMutation } from '@apollo/client';
import {
  CREATE_RECIPE,
  CREATE_VIDEO_UPLOAD,
  CREATE_THUMBNAIL,
} from './constants';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { unset, omit } from 'lodash';
import HorizontalLinearStepper from '../../components/HorizontalLinearStepper';
import IngredientAutocomplete from '../../components/IngredientAutocomplete';
import { FDCFood, RecipeStep } from '../../types';

interface FormInput {
  recipeName: string;
  [key: string]: string; // recipe-step-{n}
}

function stepAttr(order: number) {
  return {
    id: `recipe-step-${order}`,
    label: `Recipe Step ${order}`,
    variant: 'outlined' as 'outlined',
    name: `recipe-step-${order}`,
    key: `${order}`,
    rows: 4,
    multiline: true,
    required: true,
  };
}

export default function RecipeUploadPage() {
  const [createVideoUpload, createVideoUploadVars] =
    useMutation(CREATE_VIDEO_UPLOAD);
  const [createThumbnail, createThumbnailVars] = useMutation(CREATE_THUMBNAIL);
  const [createRecipe] = useMutation(CREATE_RECIPE);

  const handleInputChange = ({ target: { validity, value, name } }: any) =>
    setFormInput((prevState) => ({ ...prevState, [name]: value }));

  const initialStepField = [
    <TextField {...stepAttr(1)} onChange={handleInputChange} />,
    <TextField {...stepAttr(2)} onChange={handleInputChange} />,
    <TextField {...stepAttr(3)} onChange={handleInputChange} />,
  ];

  const [steps, setSteps] = useState(initialStepField);
  const [ingredients, setIngredients] = useState<FDCFood[]>([]);
  const [formInput, setFormInput] = useState<FormInput>({ recipeName: '' });

  const stepCount = useRef(3);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const thumbnailPreviewRef = useRef<HTMLImageElement>(null);

  const incrementStepCount = () => stepCount.current++;
  const decrementStepCount = () => stepCount.current--;

  const handleVideoUploadBtnClick = () => videoInputRef.current?.click();
  const handleThumbnailUploadBtnClick = () =>
    thumbnailInputRef.current?.click();

  const handleVideoUpload = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    if (validity.valid && file) {
      createVideoUpload({ variables: { file } });
    } else {
      console.error('Error uploading video');
    }
  };

  const handleThumbnailUpload = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    if (validity.valid && file) {
      createThumbnail({
        variables: { file },
        onCompleted: (data) => {
          if (thumbnailPreviewRef.current) {
            thumbnailPreviewRef.current.src = data.createThumbnail.url;
          }
        },
      });
    } else {
      console.error('Error uploading thumbnail'); // TODO: handle this
    }
  };

  const handleIngredientSelect = (newValue: FDCFood) => {
    const value = omit(newValue, ['__typename']) as FDCFood;
    setIngredients([...ingredients, value]);
  };

  const getSteps = (): RecipeStep[] => {
    const steps = omit(formInput, ['recipeName']);
    const stepsInput = [];
    for (const step in steps) {
      const order: number = +step.split('-')[2];
      stepsInput.push({
        order,
        instruction: steps[step],
      });
    }
    return stepsInput;
  };

  const done = (result: MutationResult): boolean =>
    !result.error && !result.loading && result.data;

  const onUploadRecipe = () => {
    const { data: videoData } = createVideoUploadVars;
    const { data: thumbnailData } = createThumbnailVars;
    const stepsInput = getSteps();

    if (done(createVideoUploadVars) && done(createThumbnailVars)) {
      // TODO: handle this with a loading mask if video upload mutation doesn't finish in time
      createRecipe({
        variables: {
          createRecipeInput: {
            name: formInput.recipeName,
            steps: stepsInput,
            video: videoData.createVideoUpload._id,
            thumbnail: thumbnailData.createThumbnail._id,
            ingredients: ingredients,
          },
        },
      });
    }
  };

  const handleAddStep = () => {
    incrementStepCount();
    const newStepField = (
      <TextField
        {...stepAttr(stepCount.current)}
        onChange={handleInputChange}
      />
    );
    setSteps([...steps, newStepField]);
  };

  const handleRemoveStep = () => {
    const key = `recipe-step-${stepCount.current}`;
    const input = Object.assign({}, formInput);
    unset(input, key);
    setFormInput(input);
    decrementStepCount();
    setSteps([...steps].slice(0, steps.length - 1));
  };

  const linearStepperSteps: [string, JSX.Element][] = [
    ['Upload Video', VideoUploadStep()],
    ['Ingredients', AddIngredientsStep()],
    ['Details', AddInstructionsStep()],
    ['Add thumbnail', ThumbnailUploadStep()],
    ['Review & Publish', ReviewAndPublishStep()],
  ];

  function VideoUploadStep() {
    return (
      <Button onClick={handleVideoUploadBtnClick}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Add Video
        </Typography>
        <Box sx={{ display: 'none' }}>
          <input
            ref={videoInputRef}
            type="file"
            onChange={handleVideoUpload}
            required
          />
        </Box>
      </Button>
    );
  }

  function AddIngredientsStep() {
    return (
      <>
        <IngredientAutocomplete onSelect={handleIngredientSelect} />
        <ul>
          {ingredients.map((d) => {
            return <li>{d.description}</li>;
          })}
        </ul>
      </>
    );
  }

  function ThumbnailUploadStep() {
    return (
      <>
        <Box
          sx={{ height: '500px', width: '500px', border: '1px dashed teal' }}
        >
          <img ref={thumbnailPreviewRef} alt="thumbnail-preview" />
          <Button variant="outlined" onClick={handleThumbnailUploadBtnClick}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Add Thumbnail
            </Typography>
            <Box sx={{ display: 'none' }}>
              <input
                ref={thumbnailInputRef}
                type="file"
                onChange={handleThumbnailUpload}
                required
              />
            </Box>
          </Button>
        </Box>
      </>
    );
  }

  function AddInstructionsStep() {
    return (
      <Stack spacing={2}>
        <TextField
          id="recipe-name"
          label="Recipe Name"
          name="recipeName"
          variant="outlined"
          onChange={handleInputChange}
          required
        />
        {steps}
        <Button variant="outlined" onClick={handleAddStep}>
          Add Step
        </Button>
        <Button variant="outlined" onClick={handleRemoveStep} color="error">
          Remove Step
        </Button>
      </Stack>
    );
  }

  function ReviewAndPublishStep() {
    const { data } = createThumbnailVars;
    return (
      <Stack spacing={2}>
        <Box>{formInput.recipeName}</Box>
        <Box>
          <img src={data?.createThumbnail.url} alt="thumbnail-preview" />
        </Box>
        {ingredients.map((ingrd) => {
          return <Box>{ingrd.description}</Box>;
        })}
        {getSteps().map((step) => {
          return <Box>{step.instruction}</Box>;
        })}
      </Stack>
    );
  }

  return (
    <main>
      <HorizontalLinearStepper
        steps={linearStepperSteps}
        handleFinish={onUploadRecipe}
      />
    </main>
  );
}
