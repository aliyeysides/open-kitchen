import { useState, useRef } from 'react';
import { MutationResult, useMutation } from '@apollo/client';
import {
  CREATE_RECIPE,
  CREATE_VIDEO_UPLOAD,
  CREATE_THUMBNAIL,
} from '../Recipes/constants';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { unset, omit } from 'lodash';
import HorizontalLinearStepper from '../../components/HorizontalLinearStepper';
import { FDCFood, RecipeStep } from '../../types';
import RecipePage from '../Recipe';
import AddIngredientsStep from './AddIngredientsStep';
import VideoUploadStep from './VideoUploadStep';
import ThumbnailUploadStep from './ThumbnailUploadStep';

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

  const [formInput, setFormInput] = useState<FormInput>({ recipeName: '' });

  const initialStepField = [
    <TextField
      {...stepAttr(1)}
      onChange={handleInputChange}
      value={formInput[`recipe-step-${1}`]}
    />,
    <TextField
      {...stepAttr(2)}
      onChange={handleInputChange}
      value={formInput[`recipe-step-${1}`]}
    />,
    <TextField
      {...stepAttr(3)}
      onChange={handleInputChange}
      value={formInput[`recipe-step-${1}`]}
    />,
  ];

  const [steps, setSteps] = useState(initialStepField);
  const [ingredients, setIngredients] = useState<FDCFood[]>([]);

  const stepCount = useRef(3);

  const incrementStepCount = () => stepCount.current++;
  const decrementStepCount = () => stepCount.current--;

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
          // if (thumbnailPreviewRef.current) { // TODO: create separate component to handle preview
          //   thumbnailPreviewRef.current.src = data.createThumbnail.url;
          // }
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
    ['Upload Video', <VideoUploadStep onChange={handleVideoUpload} />],
    [
      'Ingredients',
      <AddIngredientsStep
        ingredients={ingredients}
        onSelect={handleIngredientSelect}
      />,
    ],
    ['Details', AddInstructionsStep()],
    ['Add thumbnail', <ThumbnailUploadStep onChange={handleThumbnailUpload} />],
    ['Review & Publish', ReviewAndPublishStep()],
  ];

  function AddInstructionsStep() {
    return (
      <Stack spacing={2}>
        <TextField
          id="recipe-name"
          label="Recipe Name"
          name="recipeName"
          variant="outlined"
          onChange={handleInputChange}
          value={formInput.recipeName}
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
    // return <RecipePage previewId="test" />; // TODO: reuse recipe page component
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
