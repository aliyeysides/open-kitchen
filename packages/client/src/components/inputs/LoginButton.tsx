import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const FIND_OR_CREATE_USER = gql`
  mutation createUser($user_id: String!) {
    createUser(user_id: $user_id) {
      name
    }
  }
`;

function LoginButton() {
  const { isLoading, loginWithRedirect, user } = useAuth0();
  const [findOrCreateUser, { loading, error, data }] =
    useMutation(FIND_OR_CREATE_USER);

  useEffect(() => {
    user && findOrCreateUser({ variables: { user_id: user } });
    console.log('data::::::', data);
  }, [user, findOrCreateUser, data]);

  return (
    <Box data-testid="login-button">
      {!isLoading && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={async () =>
              await loginWithRedirect({ redirectUri: '/?referer=auth0' })
            }
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );
}

export default LoginButton;
