import { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { CloseOutlined } from "@mui/icons-material";

const LoginButton = ({ setIsLogin }: { setIsLogin: Function }) => {
  const context = useContext(UserContext)!;
  const [clicked, setClicked] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        name: nameRef.current?.value,
        password: passwordRef.current?.value,
      });

      console.log(res);
      setIsLogin(true);

      if (context) {
        setClicked(false);
        context.userDispatch({
          type: "CREATE",
          data: {
            id: res.data.user.id,
            name: nameRef.current?.value || "",
            password: passwordRef.current?.value || "",
          },
        });
      }
    } catch (e) {
      setError("התחברות נכשלה, ודא שהשם והסיסמא נכונים");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setClicked(true)}
        sx={{ marginRight: "10px" }}
      >
        Login
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
          <Button
            onClick={() => setClicked(false)}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            <CloseOutlined />
          </Button>

          <Typography variant="h6" component="h2">
            {" "}
            Login{" "}
          </Typography>

          <TextField
            fullWidth
            label="Name"
            name="name"
            inputRef={nameRef}
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
            {" "}
            save
          </Button>

          <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>

          <Button onClick={() => setClicked(false)} sx={{ mt: 2 }}>
            No Account? Register Now
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default LoginButton;
