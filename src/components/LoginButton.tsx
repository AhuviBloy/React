


import React, { useContext, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { UserContext } from "../types/UserContext";


const LoginButton = () => {
  const { userDispatch } = useContext(UserContext)!;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    if (formData.username && formData.password) {
      userDispatch({
        type: "CREATE",
        data: { firstName: formData.username,password:formData.password}, //email: `${formData.username}@example.com` },
      });
      setOpen(false);
    }
  };

  return (
    <>
      <Box sx={{ position: "absolute", top: 0, left: 0, m: 2 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          LOGIN
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="login-modal">
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              required
            />
            <Button fullWidth variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default LoginButton;
