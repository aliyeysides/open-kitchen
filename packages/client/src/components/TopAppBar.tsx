import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Chip from '@mui/material/Chip';
import LinkButton from './LinkButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

export default function TopAppBar() {
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    async function fetchVersion() {
      const { data } = await axios('/version');
      setVersion(data);
    }
    fetchVersion();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <LinkButton to="/recipes">FoodTube</LinkButton>
            <Chip label={`v${version}`} color="primary" variant="outlined" />
          </Typography>
          <ShoppingCartOutlinedIcon
            sx={{ m: 1, marginRight: 2, cursor: 'pointer' }}
          />
          <LinkButton color="primary" variant="outlined" to="/recipes/upload">
            Upload
          </LinkButton>
          <Box sx={{ marginLeft: 2 }}>
            <Avatar>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
