import { useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import AvatarAndUpdateButton from "../User/AvatarAndUpdateButton";
import LoginButton from "../User/LoginButton";
import RegistorButton from "../User/RegistorButton";
import recipeStore from "../../store/recipeStore";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const { error, openSnackbar, handleCloseSnackbar } = recipeStore;

  return (
    <>
     <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>


      <Box
        sx={{
          position: "fixed", 
          top: 20, 
          left: 20, 
          zIndex: 1000,
        }}
      >
        {!isLogin ? (
          <>
            <LoginButton setIsLogin={setIsLogin} />
            <RegistorButton setIsLogin={setIsLogin} />
          </>
        ) : (
          <>
            <AvatarAndUpdateButton />
          </>
        )}
      </Box>
    </>
  );
};

export default HomePage;
