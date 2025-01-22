import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { CloseOutlined } from "@mui/icons-material";




const RegistorButton=({ setIsLogin }: { setIsLogin: Function })=>{

    const context = useContext(UserContext)!;
    const [clicked, setClicked] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [user,setUser]=useState(context.user)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
                 const res = await axios.post(
                   "http://localhost:3000/api/user/register",{
                    name: nameRef.current?.value,
                    email:emailRef.current?.value,
                    password: passwordRef.current?.value
                   }
                   
                 );
                 setUser(res.data.user);
                 setIsLogin(true); 
                 if (context) {
                    setClicked(false);
                    context.userDispatch({ type: 'CREATE', data: { id:res.data.userId, name: nameRef.current?.value || '',email:emailRef.current?.value || '', password: passwordRef.current?.value || '' } })
                  }
               } catch (error) {
                 setError("הרשמה נכשלה, ייתכן שהמשתמש קיים כבר");
               }
             };
              
  
    return (
      <>
        <Button variant="contained"  onClick={() => setClicked(true)}
          sx={{ marginRight: '10px' }}
          >Sign In</Button>
  
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

            <Typography variant="h6" component="h2"> Sign In</Typography>
  
            <TextField
              fullWidth
              label="Name"
              name="name"
              inputRef={nameRef}
              sx={{ mb: 2 }}
            />
           <TextField
               fullWidth
               label="Email"
               name="email"
               inputRef={emailRef}
               sx={{ mb: 2 }}
             />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              inputRef={passwordRef}
              sx={{ mb: 2 }}
            />
  
            <Button variant="contained" onClick={handleSubmit}>
              save
            </Button>
  
            <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>
  
          </Box>
        </Modal>
      </>
     )
}

export default RegistorButton