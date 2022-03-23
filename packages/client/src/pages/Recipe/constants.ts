import { gql } from '@apollo/client';

export const GET_RECIPE = gql`
  query GetRecipe($id: String!) {
    recipe(id: $id) {
      _id
      ytId
      name
      tags
      steps {
        order
        instruction
        ingredients {
          name
          quantity
          unit
        }
        startTime
      }
      ingredients {
        name
        quantity
        unit
      }
    }
  }
`;
