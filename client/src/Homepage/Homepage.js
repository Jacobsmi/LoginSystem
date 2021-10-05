import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Homepage(){

  const [firstName, setFirstName] = useState('')

  useEffect(()=>{
    (async () =>{
      /*const res = await fetch("http://localhost:5000/userInfo");
      const apiResJson = await res.json();*/
      
    })();
  })
  return(
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        minHeight: "600px",
        bgcolor: "primary.main"
      }}
      >
        Welcome, {firstName}
      </Box>
  )
}