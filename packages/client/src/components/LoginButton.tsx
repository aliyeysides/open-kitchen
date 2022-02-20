import { Button } from '@mui/material';
import { useAuth0 } from './Auth0Context';

function LoginButton() {
  const { isLoading, loginWithRedirect } = useAuth0();

  return (
    <div>
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
    </div>
  );
}

export default LoginButton;
