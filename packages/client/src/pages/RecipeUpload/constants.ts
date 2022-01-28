import { gql } from '@apollo/client';

export const CREATE_VIDEO_UPLOAD = gql`
  mutation CreateVideoUpload($file: Upload!) {
    createVideoUpload(file: $file) {
      _id
      name
    }
  }
`;

export const CREATE_THUMBNAIL = gql`
  mutation CreateThumbnail($file: Upload!) {
    createThumbnail(file: $file) {
      name
      url
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {
    createRecipe(createRecipeInput: $createRecipeInput) {
      name
    }
  }
`;
