import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { Auth0Context } from './Auth0Context';

function LoginButton() {
  const { isLoading, loginWithRedirect } = useContext(Auth0Context);

  return (
    <Box data-testid="login-button">
      {!isLoading && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={loginWithRedirect}
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );
}

export default LoginButton;
