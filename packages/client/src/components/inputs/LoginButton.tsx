import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { isLoading, loginWithPopup } = useAuth0();

  const handleLogin = async () => {
    await loginWithPopup();
  };

  return (
    <Box data-testid="login-button">
      {!isLoading && (
        <>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </>
      )}
    </Box>
  );
}

export default LoginButton;
