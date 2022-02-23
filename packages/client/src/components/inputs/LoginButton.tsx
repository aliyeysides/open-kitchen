import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { isLoading, loginWithRedirect } = useAuth0();

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
