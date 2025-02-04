
import React, { useContext, useState } from "react";
import { Avatar as MUIAvatar, Box, Typography } from "@mui/material";

import UpdateForm from "./UpdateForm";
import { UserContext } from "../../context/UserContext";

const AvatarAndUpdateButton = () => {
  const { user } = useContext(UserContext)!;
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <MUIAvatar
        sx={{
          bgcolor: "primary.main", 
          width: 56, 
          height: 56, 
          fontSize: 24,  
          fontWeight: "bold",  
        }}
      >
        {user.name.charAt(0).toUpperCase()}
      </MUIAvatar>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="h6" sx={{ fontWeight: "600", color: "text.primary" }}>
         Hi {user.name}
        </Typography>
      </Box>
       <UpdateForm setOpen={setOpen}></UpdateForm>
    </Box>
  );
};

export default AvatarAndUpdateButton;
