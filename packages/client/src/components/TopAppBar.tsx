import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinkButton from './LinkButton';
import KitchenIcon from '@mui/icons-material/Kitchen';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import LoginButton from './LoginButton';
import { useAuth0 } from './Auth0Context';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function TopAppBar() {
  const [version, setVersion] = useState<string>('');
  const { isLoading, user, isAuthenticated } =
    useAuth0();
  useEffect(() => {
    async function fetchVersion() {
      const { data } = await axios('/version');
      setVersion(data);
    }
    fetchVersion();
  }, []);

  let navigate = useNavigate();

  const openProfile = () => {
    let path = `/profile`;
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <LinkButton to="/recipes" color="primary">
              <Box sx={{ marginRight: 1 }}>Open Kitchen </Box>
              <KitchenIcon sx={{ marginRight: 1 }} color="primary" />
            </LinkButton>
            <Chip label={`v${version}`} color="primary" variant="outlined" />
          </Typography>
          <LinkButton color="primary" variant="outlined" to="/recipes/upload">
            Upload
          </LinkButton>
          <Box sx={{ marginLeft: 2 }}>
            {!isLoading &&
              (!isAuthenticated ? (
                <LoginButton />
              ) : (
                <Button onClick={openProfile}>
                  <Avatar>{user.name.slice(0, 2)}</Avatar>
                </Button>
              ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
