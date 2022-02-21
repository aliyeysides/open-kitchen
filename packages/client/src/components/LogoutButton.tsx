import { Button } from '@mui/material';
import { useContext } from 'react';
import { Auth0Context } from './Auth0Context';

function LogoutButton() {
  const { logout } = useContext(Auth0Context);

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
