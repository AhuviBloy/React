import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  ListAlt as ListAltIcon,
  AddCircle as AddCircleIcon,
} from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";
import { useTheme } from "@mui/material/styles"; 

const NavBar = () => {
  const context = useContext(UserContext);
  const theme = useTheme(); 

  return (
    <Box
      sx={{
        position: "fixed",
        top: 10,
        right: 10,
        display: "flex",
        flexDirection: "row-reverse", 
        alignItems: "center",
        padding: "8px 16px",
        zIndex: 1000, 
      }}
    >
      {[
        { text: "Home Page", path: "/", icon: <HomeIcon /> },
        { text: "Recipes List", path: "/recipes", icon: <ListAltIcon /> },
        context?.user?.id && {
          text: "Add Recipe",
          path: "/Addrecipe",
          icon: <AddCircleIcon />,
        },
        context?.user?.id && {
          text: "My Recipes",
          path: "/MyRecipe",
          icon: <AddCircleIcon />,
        },
      ]
        .filter(Boolean)
        .map((item: any, index) => (
          <React.Fragment key={index}>
            <Link
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: theme.palette.common.white, 
                padding: "8px 12px",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "0.3s",
                backgroundColor: theme.palette.primary.main, 
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", 
                marginLeft: "10px", 
                outline: "none", 
              }}
            >
              {item.icon}
              <Typography sx={{ ml: 1 }}>{item.text}</Typography>
            </Link>
          </React.Fragment>
        ))}
    </Box>
  );
};

export default NavBar;
