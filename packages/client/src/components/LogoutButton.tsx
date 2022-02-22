import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Box data-testid="logout-button">
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
    </Box>
  );
}

export default LogoutButton;
