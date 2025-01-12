
import React, { useContext, useState } from "react";
import { Avatar as MUIAvatar, Box, Button, Modal, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";  // אייקון עריכה

import UpdateForm from "../UpdateForm/UpdateForm";
import { UserContext } from "../../context/UserContext";

const AvatarAndUpdateButton = () => {
  const { user ,userDispatch } = useContext(UserContext)!;
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* אוותר עם צבע רקע */}
      <MUIAvatar
        sx={{
          bgcolor: "primary.main", 
          width: 56, 
          height: 56, 
          fontSize: 24,  
          fontWeight: "bold",  
        }}
      >
        {user.firstName.charAt(0).toUpperCase()}
      </MUIAvatar>

      {/* שם המשתמש */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="h6" sx={{ fontWeight: "600", color: "text.primary" }}>
         Hi {user.firstName} {user.lastName}
        </Typography>
      </Box>

      {/* כפתור Update עם אייקון */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontWeight: "bold",
          textTransform: "none",  // הוספתי את המאפיין הזה כדי למנוע את הגדלת האותיות
          borderRadius: 2,
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <EditIcon />
        Update Details
      </Button>

      {/* מודאל עבור עדכון פרטי המשתמש */}
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="update-form-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <UpdateForm setOpen={() => setOpen(false)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default AvatarAndUpdateButton;
