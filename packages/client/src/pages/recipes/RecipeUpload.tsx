import { useState, useRef } from 'react';
import { MutationResult, useMutation } from '@apollo/client';
import {
  CREATE_RECIPE,
  CREATE_VIDEO_UPLOAD,
  CREATE_THUMBNAIL,
} from './constants';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { unset, omit } from 'lodash';
import HorizontalLinearStepper from '../../components/HorizontalLinearStepper';

type FormInput = { [key: string]: any };

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
  const [formInput, setFormInput] = useState<FormInput>({});

  const stepCount = useRef(3);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

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
      createThumbnail({ variables: { file } });
    } else {
      console.log('Error uploading thumbnail');
    }
  };

  const getSteps = () => {
    const steps = omit(formInput, ['recipe-name']);
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

  const onUploadRecipe = () => {
    const { data: videoData } = createVideoUploadVars;
    const { data: thumbnailData } = createThumbnailVars;
    const stepsInput = getSteps();

    const done = (result: MutationResult): boolean =>
      !result.error && !result.loading && result.data;

    if (done(createVideoUploadVars) && done(createThumbnailVars)) {
      // todo: handle this with a loading mask if video upload mutation doesn't finish in time
      createRecipe({
        variables: {
          createRecipeInput: {
            name: formInput['recipe-name'],
            steps: stepsInput,
            video: videoData.createVideoUpload._id,
            thumbnail: thumbnailData.createThumbnail._id,
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

  const linearStepperSteps: [string, any][] = [
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
    return <>Ingredients step...</>;
  }

  function ThumbnailUploadStep() {
    return (
      <Button onClick={handleThumbnailUploadBtnClick}>
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
    );
  }

  function AddInstructionsStep() {
    return (
      <>
        <TextField
          id="recipe-name"
          label="Recipe Name"
          name="recipe-name"
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
      </>
    );
  }

  function ReviewAndPublishStep() {
    return (
      <Button onClick={onUploadRecipe} variant="contained" color="primary">
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Upload Recipe
        </Typography>
      </Button>
    );
  }

  return (
    <main>
      <HorizontalLinearStepper steps={linearStepperSteps} />
      {/* <Box
        component="form"
        sx={{
          display: 'flex',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Container maxWidth="sm">
          <Stack sx={{ alignItems: 'center' }} spacing={2}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Create a Recipe
            </Typography>
            <TextField
              id="recipe-name"
              label="Recipe Name"
              name="recipe-name"
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
            <Button onClick={handleThumbnailUploadBtnClick}>
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
            <Button
              onClick={onUploadRecipe}
              variant="contained"
              color="primary"
            >
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Upload Recipe
              </Typography>
            </Button>
          </Stack>
        </Container>
      </Box> */}
    </main>
  );
}
