import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './Landing/Landing';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4361EE"
      },
      secondary: {
        main: "#f72585"
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}