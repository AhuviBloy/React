import { AppBar, Toolbar, Box, Button, Typography, Container } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        right: 0,
        top: 0,
        height: '100vh', // גובה הסרגל
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // למרכז את התוכן באופן אנכי
        alignItems: 'center', // למרכז את התוכן באופן אופקי
        backgroundColor: '#1976d2', // צבע רקע
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)', // הצללה
        paddingTop: 2,
      }}
    >
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {/* כותרת עליונה */}
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: 3,
              paddingLeft: 2,
            }}
          >
            MyApp
          </Typography>

          {/* כפתורי הניווט */}
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              textTransform: "none",
              marginBottom: 2,
              padding: '10px 20px',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // צבע רקע בהובר
              },
            }}
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="father"
            sx={{
              textTransform: "none",
              marginBottom: 2,
              padding: '10px 20px',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // צבע רקע בהובר
              },
            }}
          >
            Father
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="father/son"
            sx={{
              textTransform: "none",
              marginBottom: 2,
              padding: '10px 20px',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // צבע רקע בהובר
              },
            }}
          >
            Son
          </Button>

          <Container sx={{ marginTop: 10, flex: 1 }}>
        <Outlet />
      </Container>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
