import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function Homepage(){
  const history = useHistory();
  const [firstName, setFirstName] = useState('')

  useEffect(()=>{
    (async () =>{
      const res = await fetch("http://localhost:5000/userInfo",{
        method:"GET",
        credentials: "include"
      });
      const apiResJson = await res.json();
      if (apiResJson.success === false){
        if(apiResJson.err === "no-jwt"){
          history.push("/")
        }else{
          console.log("Server Error")
        }
      }else{
        console.log(apiResJson)
        setFirstName(apiResJson.first_name)
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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