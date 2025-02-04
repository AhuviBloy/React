import {  RouterProvider } from "react-router-dom";
import { myRouter } from "./Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5722", 
    },
    secondary: {
      main: "#4caf50", 
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff", 
    },
    text: {
      primary: "#333333", 
      secondary: "#666666", 
    },
  },
});

const App = () => {
  return (
   <ThemeProvider theme={theme}>
   <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/recipes.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.3, 
        zIndex: -1, 
      }}
    ></div>
      <RouterProvider router={myRouter} />  
   </ThemeProvider>
      
  );
};

export default App;
