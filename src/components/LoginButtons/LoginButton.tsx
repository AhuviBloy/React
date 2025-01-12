

import React, { useState } from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
// import axios, { AxiosError } from "axios"

const AuthButtons = () => {
  const [isLogin, setIsLogin] = useState(true); // מצב האם אנחנו בהתחברות או הרשמה
  const { user,userDispatch } = useContext(UserContext)!;
  const [formData, setFormData] = useState({ ...user });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (isLogin) {
      // התחברות
      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          formData
        );
        userDispatch({
          type: "CREATE",
          data: {
            firstName: response.data.user.firstName,
            email: response.data.user.email,
          },
        });
        setOpen(false);
      } catch (error) {
        setError("התחברות נכשלה, ודא שהשם והסיסמא נכונים");
      }
    } else {
      // הרשמה
      try {
        const response = await axios.post(
          "http://localhost:5000/register",
          formData
        );
        alert("הרשמה הצליחה! עכשיו תוכל להתחבר");
        setIsLogin(true); // עבור למצב התחברות
      } catch (error) {
        setError("הרשמה נכשלה, ייתכן שהמשתמש קיים כבר");
      }
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        התחבר
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
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
          <Typography variant="h6" component="h2">
            {isLogin ? "התחבר" : "הרשם"}
          </Typography>
          
          {!isLogin && <div>
          <TextField
              fullWidth
              label="Name"
              name="firstName"
              value={formData.Name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            {/* <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            /> */}
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          </div>}

          {isLogin && <div>
          <TextField
              fullWidth
              label="Name"
              name="name"
              type="text"
              value={formData.Name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            {/* <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            /> */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          </div>}
           

          <Button variant="contained" onClick={handleSubmit}>
            {isLogin ? "התחבר" : "הרשם"}
          </Button>

          <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>

          <Button onClick={() => setIsLogin(!isLogin)} sx={{ mt: 2 }}>
            {isLogin ? "אין לך חשבון? הרשם עכשיו" : "יש לך חשבון? התחבר"}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AuthButtons;
