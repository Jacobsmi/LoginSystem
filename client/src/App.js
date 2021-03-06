import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './Landing/Landing';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Signup from "./Signup/Signup";
import Homepage from "./Homepage/Homepage";
import Login from "./Login/Login";

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#264653",
        contrastText: "#FFFFFF"
      },
      secondary: {
        main: "#2A9D8F"
      },
      third:{
        main:"#FFFFFF",
        contrastText: "#000000"
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Homepage />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}