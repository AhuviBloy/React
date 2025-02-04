import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { CloseOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";  

const UpdateForm = ({ setOpen }: { setOpen: Function }) => {
  
  const context = useContext(UserContext)!;
  
  const [name, setName] = useState(context.user.name);
  const [email, setEmail] = useState(context.user.email);
  const [address, setAddress] = useState(context.user.address);
  const [phone, setPhone] = useState(context.user.phone);
  
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(context.user.name);
    setEmail(context.user.email);
    setAddress(context.user.address);
    setPhone(context.user.phone);
  }, [context.user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:3000/api/user', {
        name,
        email,
        address,
        phone
      }, {
        headers: {          
          'user-id': context.user.id
        }
      });

    
    
      if (context?.user) {
        setClicked(false);
        context.userDispatch({ type: 'UPDATE', data: res.data });
      }

    } catch (e) {
      setError("User not found");
    }
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setClicked(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderRadius: 2,
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <EditIcon />
        Update Details
      </Button>

      <Modal open={clicked} onClose={() => setClicked(false)}>
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
          <Button onClick={() => setClicked(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
            }}>
            <CloseOutlined />
          </Button>

          <Typography variant="h6" component="h2" sx={{ mb: 2 }}> User Details</Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}  
            onChange={(e) => setEmail(e.target.value)} 
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={address} 
            onChange={(e) => setAddress(e.target.value)}  
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}  
            sx={{ mb: 2 }}
          />

          <Button variant="contained" onClick={handleSubmit}>
            save
          </Button>

          <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateForm;
