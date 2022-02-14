import { gql } from '@apollo/client';

export const GET_RECIPE = gql`
  query Recipe($id: String!) {
    recipe(id: $id) {
      _id
      name
      steps {
        order
        instruction
      }
      ingredients {
        name
      }
      # video {
      #   _id
      #   name
      #   url
      # }
    }
  }
`;
