import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Signup() {

  const history = useHistory();

  // State to track values and validity of values
  // State is used to track values because it allows for easy updating on validity of fields in real-time
  // and allows for the value of inputs to easily be accessed throughout the function
  const [firstName, setFirstName] = useState('')
  const [validFirstName, setValidFirstName] = useState(true)

  const [lastName, setLastName] = useState('')
  const [validLastName, setValidLastName] = useState(true)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(true)
  const [uniqueEmail, setUniqueEmail] = useState(true)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(true)

  const [confirm, setConfirm] = useState('')
  const [validConfirm, setValidConfirm] = useState(true)

  // Regex to test validity of values
  const nameRegex = /^[A-z]+[A-z-']{0,40}$/
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[0-9a-zA-Z!@#$%^&*()]{8,}$/

  // Handle change function updates values of state for each field
  const handleChange = (event) => {
    if (event.target.id === "Signup-FirstName") {
      setFirstName(event.target.value);
      setValidFirstName(nameRegex.test(event.target.value))
    } else if (event.target.id === "Signup-LastName") {
      setLastName(event.target.value)
      setValidLastName(nameRegex.test(event.target.value))
    } else if (event.target.id === "Signup-Email") {
      setEmail(event.target.value)
      setValidEmail(emailRegex.test(event.target.value))
      setUniqueEmail(true)
    } else if (event.target.id === "Signup-Password") {
      setPassword(event.target.value)
      setValidPassword(passwordRegex.test(event.target.value))
    } else if (event.target.id === "Signup-Confirm") {
      setConfirm(event.target.value)
      setValidConfirm((event.target.value === password ? true : false))
    }
  }

  const handleClick = async () => {
    setValidFirstName(firstName)
    setValidLastName(lastName)
    setValidEmail(email)
    setValidPassword(password)
    setValidConfirm((confirm === password ? true : false))
    
    document.getElementById("Signup-Errors").innerHTML = ""

    if (nameRegex.test(firstName) && nameRegex.test(lastName) && emailRegex.test(email) && passwordRegex.test(password) && confirm === password) {
      const apiResult = await fetch("http://localhost:5000/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        }),
        credentials: "include",

      })
      const apiResultJSON = await apiResult.json();
      console.log(apiResultJSON)
      // Handle a successful API call by re-routing to the homepage
      if (apiResultJSON.success === true) {
        history.push("/home");
      } else if (apiResultJSON.success === false) {
        // Handle API errors
        // If the email is not unique set validity of email to false and set unique email to false which displays the proper helper text
        if (apiResultJSON.err === "non-unqiue-email") {
          setUniqueEmail(false)
          setValidEmail(false)
        } else {
          document.getElementById("Signup-Errors").innerHTML = "Some error occurred on the server"
        }
      }
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
          height: "80%",
          width: ["90%", "80%", "50%", "40%", "30%"],
          bgcolor: "white",
          borderRadius: "20px",
          textAlign: "center"

        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "5%", marginTop: "5%" }}
        >Sign Up</Typography>

        <Typography
          variant="h4"
          sx={{ marginBottom: "5%", marginTop: "5%" }}
          id="Signup-Errors"
        ></Typography>


        <TextField
          required
          variant="standard"
          label="First Name"
          sx={{
            width: "40%",
            marginRight: "10%"
          }}
          type="text"
          value={firstName}
          onChange={handleChange}
          error={!validFirstName}
          id="Signup-FirstName"
        ></TextField>


        <TextField
          required
          variant="standard"
          label="Last Name"
          sx={{
            width: "40%",
          }}
          type="text"
          value={lastName}
          onChange={handleChange}
          error={!validLastName}
          id="Signup-LastName"
        ></TextField>


        <TextField
          required
          variant="standard"
          label="E-Mail"
          helperText={uniqueEmail ? "" : "Email is already in use"}
          type="email"
          sx={{
            width: "90%",
            marginTop: "5%"
          }}
          value={email}
          onChange={handleChange}
          error={!validEmail}
          id="Signup-Email"
        ></TextField>


        <TextField
          required
          variant="standard"
          label="Password"
          sx={{
            width: "90%",
            marginTop: "5%"
          }}
          type="password"
          helperText="Password must be atleast 8 digits and have an uppercase, number, and special character."
          value={password}
          onChange={handleChange}
          error={!validPassword}
          id="Signup-Password"
        ></TextField>


        <TextField
          required
          variant="standard"
          label="Confirm Password"
          sx={{
            width: "90%",
            marginTop: "5%"
          }}
          type="password"
          value={confirm}
          onChange={handleChange}
          error={!validConfirm}
          id="Signup-Confirm"
        ></TextField>


        <Button
          variant="contained"
          sx={{ marginTop: "10%" }}
          onClick={handleClick}
        >Sign Up</Button>


      </Box>
    </Box>
  )
}