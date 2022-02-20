import { Button } from '@mui/material';
import { useAuth0 } from './Auth0Context';

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        Log Out
      </Button>
    </div>
  );
}

export default LogoutButton;
