import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Landing(){
  return(
    <Box className="Landing"
      sx={{
        height: "100vh",
        width: "100vw",
        minHeight: "600px"
      }}
    >
      <AppBar position="static" sx={{height:"10%"}}>
        <Toolbar>
          <Typography variant="h6" flexGrow="1">App Name</Typography>
          <Button variant="contained" color="third" component={Link} to="/login" sx={{marginRight: "2%"}}>Log In</Button>
          <Button variant="contained" color="secondary" component={Link} to="/signup">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Box 
        sx={{
          height: "90%",
          width: "100%",
          display: "flex",

        }}
      >
        <Box
          sx={{
            marginLeft: "5%",
            width: "45%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography variant="h3" sx={{marginTop: "30%"}}>Some Title goes here</Typography>
          <Typography variant="h5" sx={{marginTop: "10%"}}>Some Subtitle with more text and more words goes here</Typography>
        </Box>
      </Box>
    </Box>
  )
}