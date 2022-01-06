// import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import TopAppBar from "./components/TopAppBar";

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
