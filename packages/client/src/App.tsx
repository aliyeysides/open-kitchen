import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import TopAppBar from './components/surfaces/TopAppBar';

function App() {
  return (
    <Box className="App">
      <TopAppBar />
      <Box
        className="app-container"
        sx={{
          my: 4,
          mx: 10,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
