import { gql } from '@apollo/client';

export const GET_NICKNAME = gql`
  query {
    nickname {
      nickname
    }
  }
`;

export const SET_NICKNAME = gql`
  mutation editNickname($new_nickname: String!) {
    editNickname(editNickname: { nickname: $new_nickname }) {
      _id
      nickname
      user_id
    }
  }
`;
