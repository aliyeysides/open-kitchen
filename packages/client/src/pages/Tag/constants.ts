import { gql } from '@apollo/client';

export const GET_RECIPES_BY_TAG = gql`
  query RecipesByTag($tag: String!) {
    recipesByTag(tag: $tag) {
      _id
      ytId
      name
      tags
    }
  }
`;
