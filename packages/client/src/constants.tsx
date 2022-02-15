import { gql } from '@apollo/client';

export const GET_ALL = gql`
  query GetAll {
    flavors {
      name
      updated
    }
    flavor(id: "6172ae137c794081cdc39167") {
      name
    }
    ingredients {
      name
      updated
    }
    ingredient(id: "6172ae137c794081cdc3916c") {
      name
    }
  }
`;

export const GET_FLAVORS = gql`
  query Flavors {
    flavors {
      name
      updated
    }
  }
`;

export const GET_FLAVOR = gql`
  query Flavor($id: String!) {
    flavor(id: $id) {
      name
    }
  }
`;

export const GET_INGREDIENTS = gql`
  query Ingredients {
    ingredients {
      name
      updated
    }
  }
`;

export const GET_INGREDIENT = gql`
  query Ingredient($id: String!) {
    ingredient(id: $id) {
      name
    }
  }
`;

export const CREATE_INGREDIENT = gql`
  mutation CreateIngredient($name: String!) {
    create(name: $name) {
      name
      created_at
      updated_at
    }
  }
`;
