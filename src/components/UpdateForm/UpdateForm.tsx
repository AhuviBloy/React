
import React, { useContext, useRef, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { CloseOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";  // אייקון עריכה



const UpdateForm = ({ setOpen }: { setOpen: () => void }) => {
  
  const context = useContext(UserContext)!;
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef=useRef<HTMLInputElement>(null);
  const phoneRef=useRef<HTMLInputElement>(null);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");
  const [user,setUser]=useState(context.user)

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const res = await axios.put('http://localhost:3000/api/user', {
        name: nameRef.current?.value || context?.user.name,
        // password:passwordRef.current?.value|| context?.user.password,
        email: emailRef.current?.value||context?.user.email,
        address:addressRef.current?.value|| context?.user.address,
        phone:phoneRef.current?.value|| context?.user.phone
    },
    {
        headers: {
            'user-id': context?.user.id
        },
    })
    

    
     if (context?.user) {
       setClicked(false)
       context.userDispatch({ type: 'UPDATE', data: res.data.user })
     }

 }catch (e) {
      setError("משתמש לא קיים");

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

            <CloseOutlined /></Button>

            <Typography variant="h6" component="h2" sx={{ mb: 2 }}> User Details</Typography>

            <TextField
              fullWidth
              label="Name"
              name="name"
              // value={nameRef.current?.value}
              value={user.name}
              inputRef={nameRef}
              sx={{ mb: 2 }}
            />
           
            <TextField
              fullWidth
              label="Email"
              name="email"
              // value={emailRef.current?.value}
              value={user.email}
              inputRef={emailRef}
              sx={{ mb: 2 }}
            />
            {/* <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={passwordRef.current?.value}
              inputRef={passwordRef}
              sx={{ mb: 2 }}
            /> */}
            <TextField
              fullWidth
              label="Address"
              name="address"
              // value={addressRef.current?.value}
              value={user.address}
              inputRef={addressRef}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              // value={phoneRef.current?.value}
              value={user.phone}
              inputRef={phoneRef}
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
