

import React, { useContext, useState } from "react";
import { Avatar as MUIAvatar, Box, Button, Modal } from "@mui/material";

import UpdateForm from "./UpdateForm";
import { UserContext } from "../types/UserContext";

const Avatar = () => {
  const { user } = useContext(UserContext)!;
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <MUIAvatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
        {user.firstName.charAt(0).toUpperCase()}
      </MUIAvatar>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Update
      </Button>
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

export default Avatar;
