import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(true)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(true)

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[0-9a-zA-Z!@#$%^&*()]{8,}$/

  const handleChange = (event) => {
    if (event.target.id === "Login-Email") {
      setEmail(event.target.value);
      setValidEmail(emailRegex.test(event.target.value));
    } else if (event.target.id === "Login-Password") {
      setPassword(event.target.value);
      setValidPassword(passwordRegex.test(event.target.value));
    }
  }

  const handleClick = async () =>{
    setValidEmail(emailRegex.test(email));
    setValidPassword(passwordRegex.test(password));

    if (emailRegex.test(email) && passwordRegex.test(password)){
      console.log("Ready for API call")
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        minHeight: "600px",
        bgcolor: "primary.main",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          height: "50%",
          width: ["90%", "80%", "50%", "40%", "30%"],
          bgcolor: "white",
          borderRadius: "20px",
          textAlign: "center"

        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "5%", marginTop: "5%" }}
        >Log In</Typography>

        <TextField
          required
          variant="standard"
          label="E-Mail"
          sx={{
            width: "80%"
          }}
          type="text"
          value={email}
          onChange={handleChange}
          error={!validEmail}
          id="Login-Email"
        ></TextField>


        <TextField
          required
          variant="standard"
          label="Password"
          sx={{
            width: "80%",
            marginTop: "5%"
          }}
          type="password"
          value={password}
          onChange={handleChange}
          error={!validPassword}
          id="Login-Password"
        ></TextField><br />

        <Button
          variant="contained"
          sx={{ marginTop: "10%" }}
          onClick={handleClick}
        >Login</Button>
      </Box>

    </Box>
  )
}