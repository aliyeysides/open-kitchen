import { gql } from '@apollo/client';

export const TIMESTAMPS = gql`
  fragment Timestamps on Any {
    updated_at
    created_at
  }
`;
