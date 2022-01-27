import { gql } from '@apollo/client';

export const GET_VIDEO_UPLOADS = gql`
  query {
    videoUploads {
      _id
      name
      url
    }
  }
`;

export const GET_VIDEO_UPLOAD = gql`
  query VideoUpload($id: String!) {
    videoUpload(id: $id) {
      _id
      name
      url
    }
  }
`;

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

export const GET_RECIPES = gql`
  query {
    recipes {
      _id
      name
      video {
        url
      }
      thumbnail {
        url
      }
    }
  }
`;

export const GET_RECIPE = gql`
  query Recipe($id: String!) {
    recipe(id: $id) {
      _id
      name
      steps {
        order
        instruction
      }
      video {
        _id
        name
        url
      }
    }
  }
`;
