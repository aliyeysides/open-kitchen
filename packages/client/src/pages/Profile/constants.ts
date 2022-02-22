import { gql } from '@apollo/client';

export const GET_USER_NAME = gql`
  query {
    user {
      name
    }
  }
`;

export const SET_USER_NAME = gql`
  mutation editUserName($new_name: String!) {
    editUserName(editUserName: { name: $new_name }) {
      _id
      name
      user_id
    }
  }
`;
