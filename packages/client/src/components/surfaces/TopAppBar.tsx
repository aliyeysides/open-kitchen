import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinkButton from '../inputs/LinkButton';
import KitchenIcon from '@mui/icons-material/Kitchen';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import LoginButton from '../inputs/LoginButton';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../../types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CustomDialog from '../feedback/CustomDialog';

export default function TopAppBar() {
  const [version, setVersion] = useState<string>('');
  const [dialog, setDialog] = useState<boolean>(false);
  const { isLoading, isAuthenticated, user, logout } = useAuth0<User>();

  const settings = ['Log out'];

  useEffect(() => {
    async function fetchVersion() {
      try {
        const res = await axios('/version');
        res && setVersion(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchVersion();
  }, []);

  const handleUploadClick = () => {
    setDialog(!dialog);
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting: string) => {
    if (setting === 'Log out') logout();
    setAnchorElUser(null);
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
          <Button
            onClick={handleUploadClick}
            color="primary"
            variant="outlined"
          >
            Upload
          </Button>
          <CustomDialog
            open={dialog}
            onClose={handleUploadClick}
            title="Coming soon!"
            btnLabel="Back"
          >
            <Typography gutterBottom>
              This feature is not yet available but is coming soon! If you have
              any questions or feedback, please reach out to us:
              ali.yeysides@gmail.com
            </Typography>
          </CustomDialog>
          <Box sx={{ marginLeft: 2 }}>
            {!isLoading &&
              (!isAuthenticated ? (
                <LoginButton />
              ) : (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user?.name} src={user?.picture}>
                        <Avatar alt={user?.name} src="fallback"></Avatar>
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={(e) => handleCloseUserMenu(setting)}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
