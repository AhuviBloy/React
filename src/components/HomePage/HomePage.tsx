import React, { useReducer } from "react";
import { Box } from "@mui/material";
import { initialUserState, userReducer } from "../../types/user";
import LoginButton from "../LoginButtons/LoginButton";
import AvatarAndUpdateButton from "../AvatarAndUpdateButton/AvatarAndUpdateButton";
import { UserContext } from "../../context/UserContext";

const HomePage = () => {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <h1 style={{ position: "absolute", top: "45%", left: "45%" }}>home</h1>
      <Box sx={{position: "absolute", top: 0, left: 0, m: 2 }}>
        
        {!user.firstName ? <LoginButton />  : <AvatarAndUpdateButton /> }

      </Box>
    </UserContext.Provider>
  );
};

export default HomePage;
