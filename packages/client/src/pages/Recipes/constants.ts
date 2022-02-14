import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
  query {
    recipes {
      _id
      name
      # video {
      #   url
      # }
      # thumbnail {
      #   url
      # }
    }
  }
`;
