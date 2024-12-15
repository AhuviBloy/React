

import React, { useReducer } from "react";
import { Box } from "@mui/material";

import { initialUserState, userReducer } from "../types/user";
import LoginButton from "./LoginButton";
import Avatar from "./Avatar";
import { UserContext } from "../types/UserContext";

const HomePage = () => {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <Box sx={{ padding: 2 }}>
        {!user.firstName ? (
          <LoginButton />
        ) : (
          <Box sx={{ position: "absolute", top: 0, left: 0, m: 2 }}>
            <Avatar />
          </Box>
        )}
      </Box>
    </UserContext.Provider>
  );
};

export default HomePage;
