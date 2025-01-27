import React, { useReducer, useState } from "react";
import { Box } from "@mui/material";
import { initialUserState, userReducer } from "../../types/user";
// import LoginButton from "../LoginButtons/LoginButton";
import AvatarAndUpdateButton from "../AvatarAndUpdateButton/AvatarAndUpdateButton";
import { UserContext } from "../../context/UserContext";
import LoginButton from "../LoginButtons/LoginButton";
import RegistorButton from "../LoginButtons/RegistorButton";

const HomePage = () => {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);
  const [isLogin,setIsLogin]=useState(false);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <h1 style={{ position: "absolute", top: "45%", left: "45%" }}>Home</h1>
      <Box sx={{position: "absolute", top: 0, left: 0, m: 2 }}>
        
       {!isLogin?(
        <>
        <LoginButton setIsLogin={setIsLogin}/> 
        <RegistorButton setIsLogin={setIsLogin}/>
        </>
       ) :
       (<AvatarAndUpdateButton/>)}

      </Box>
    </UserContext.Provider>
  );
};

export default HomePage;
