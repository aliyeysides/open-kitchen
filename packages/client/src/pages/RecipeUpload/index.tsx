import { useState } from 'react';
import { MutationResult, useMutation } from '@apollo/client';
import {
  CREATE_RECIPE,
  CREATE_VIDEO_UPLOAD,
  CREATE_THUMBNAIL,
} from './constants';
import { omit } from 'lodash';
import HorizontalLinearStepper from '../../components/HorizontalLinearStepper';
import { FDCFood, RecipeStep as RS } from '../../types';
import AddIngredientsStep from './AddIngredientsStep';
import VideoUploadStep from './VideoUploadStep';
import ThumbnailUploadStep from './ThumbnailUploadStep';
import AddRecipeDetailsForm, {
  AddRecipeDetailsFormProps,
} from './AddRecipeDetailsForm';

type RecipeStep = Omit<RS, 'order'> & { key: number };

export default function RecipeUploadPage() {
  const [createVideoUpload, createVideoUploadVars] =
    useMutation(CREATE_VIDEO_UPLOAD);
  const [createThumbnail, createThumbnailVars] = useMutation(CREATE_THUMBNAIL);
  const [createRecipe] = useMutation(CREATE_RECIPE);

  const handleInputChange = ({ target: { value, name } }: any) =>
    setFormInput((prevState) => ({ ...prevState, [name]: value }));

  type FormData = Pick<AddRecipeDetailsFormProps, 'name' | 'newInputValue'>;

  const [formInput, setFormInput] = useState<FormData>({
    name: '',
    newInputValue: '',
  });

  const [steps, setSteps] = useState<RecipeStep[]>([]);
  const [ingredients, setIngredients] = useState<FDCFood[]>([]);

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

  const done = (result: MutationResult): boolean =>
    !result.error && !result.loading && result.data;

  const onUploadRecipe = () => {
    const { data: videoData } = createVideoUploadVars;
    const { data: thumbnailData } = createThumbnailVars;

    if (done(createVideoUploadVars) && done(createThumbnailVars)) {
      // TODO: handle this with a loading mask if video upload mutation doesn't finish in time
      createRecipe({
        variables: {
          createRecipeInput: {
            name: formInput.name,
            steps: steps,
            video: videoData.createVideoUpload._id,
            thumbnail: thumbnailData.createThumbnail._id,
            ingredients: ingredients,
          },
        },
      });
    }
  };

  const handleAddStep = () => {
    const newValue: RecipeStep = {
      instruction: formInput.newInputValue,
      key: Date.now(),
    };
    setSteps((prevState) => [...prevState, newValue]);
    setFormInput((prevState) => ({ name: prevState.name, newInputValue: '' }));
  };

  const handleDeleteStep = (step: RecipeStep) => {
    const selectedStep = step;
    const newSteps = steps.filter((step) => step.key !== selectedStep.key);
    setSteps(newSteps);
  };

  const handleEditStep = (step: RecipeStep, { target: { value } }: any) => {
    const selectedStep = step;
    const newSteps = steps.map((step) => {
      if (step.key === selectedStep.key) {
        step.instruction = value;
      }
      return step;
    });
    setSteps(newSteps);
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
    [
      'Details',
      <AddRecipeDetailsForm
        {...formInput}
        steps={steps}
        onChange={handleInputChange}
        onClick={handleAddStep}
        onDelete={handleDeleteStep}
        onEdit={handleEditStep}
      />,
    ],
    ['Add thumbnail', <ThumbnailUploadStep onChange={handleThumbnailUpload} />],
    // ['Review & Publish', ReviewAndPublishStep()],
  ];

  // function ReviewAndPublishStep() {
  //   const { data } = createThumbnailVars;
  //   return (
  //     <Stack spacing={2}>
  //       <Box>{formInput.recipeName}</Box>
  //       <Box>
  //         <img src={data?.createThumbnail.url} alt="thumbnail-preview" />
  //       </Box>
  //       {ingredients.map((ingrd) => {
  //         return <Box>{ingrd.description}</Box>;
  //       })}
  //       {getSteps().map((step) => {
  //         return <Box>{step.instruction}</Box>;
  //       })}
  //     </Stack>
  //   );
  //   // return <RecipePage previewId="test" />; // TODO: reuse recipe page component
  // }

  return (
    <main>
      <HorizontalLinearStepper
        steps={linearStepperSteps}
        handleFinish={onUploadRecipe}
      />
    </main>
  );
}
