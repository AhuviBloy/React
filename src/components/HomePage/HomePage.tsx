import { useState } from "react";
import { Box } from "@mui/material";
import AvatarAndUpdateButton from "../User/AvatarAndUpdateButton";
import LoginButton from "../User/LoginButton";
import RegistorButton from "../User/RegistorButton";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
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
