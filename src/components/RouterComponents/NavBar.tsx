import React, { useState, useContext } from "react";
import { Box, Typography, Drawer, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  ListAlt as ListAltIcon,
  AddCircle as AddCircleIcon,
  Menu as MenuIcon,
  Home,
} from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";
import { useTheme } from "@mui/material/styles";

const NavBar = () => {
  const context = useContext(UserContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const menuItems = [
    { text: "Home Page", path: "/", icon: <HomeIcon /> },
    { text: "Recipes List", path: "/recipes", icon: <ListAltIcon /> },
  ];
  
  if (context?.user?.id) {
    menuItems.push({text: "Add Recipe",path: "/Addrecipe",icon: <AddCircleIcon />,}),
    menuItems.push( {text: "My Recipes",path: "/MyRecipe",icon: <AddCircleIcon />,})
  }

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Box>
      <IconButton
        onClick={() => toggleDrawer(true)}
        sx={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 1001,
          '&:hover': {
            backgroundColor: theme.palette.primary.light,  // שינוי צבע רקע בעת מעבר עכבר
            borderRadius: '50%',  // עיגול הרקע של האייקון
            transition: 'background-color 0.3s ease', // אפקט מעבר חלק
          },
        }}
      >
        <MenuIcon sx={{ color: "black", fontSize: "35px" }} />
      </IconButton>

      {/* Drawer (תפריט צדדי) */}
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{
            width: 200,
            height: "100%",
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // למרכז את הכפתורים
            alignItems: "center", // למרכז את הכפתורים
          }}
          
        >
          {menuItems.map((item: any, index) => (
              <Link
                to={item.path}
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: theme.palette.common.black,
                  padding: "12px 16px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "0.3s",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  width: "100%", // לוודא שהכפתור תופס את כל הרוחב
                  justifyContent: "center", // למרכז את הטקסט והאייקון
                }}
                onClick={() => toggleDrawer(false)} // סגירת ה-Drawer לאחר לחיצה על לינק
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)", transform: "scale(1.05)" }
                  }}
                >
                  {item.icon}
                  <Typography sx={{ ml: 1 }}>{item.text}</Typography>
                </Box>
              </Link>
            ))}
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
