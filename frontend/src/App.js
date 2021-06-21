import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Container from '@material-ui/core/Container';

import './App.css';
import {ThemeProvider as MaterialThemeProvider} from "@material-ui/styles";
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import {createMuiTheme} from "@material-ui/core/styles";

import HeaderAppBar from "./components/HeaderAppBar";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import WarningsPage from "./pages/WarningsPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import MapPage from "./pages/MapPage";
import UploadPage from "./pages/UploadPage";

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: blue[500],
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: cyan[200],
            main: cyan[500],
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
    typography: { useNextVariants: true },
});

function App() {
  return (
    <div className="app">
        <Router>
            <MaterialThemeProvider theme={theme}>

                <HeaderAppBar />

                <Container className="app-content-container">
                    <Switch>
                        <Route path={"/about"} exact>
                            <AboutPage />
                        </Route>
                        <Route path={"/help"} exact>
                            <HelpPage/>
                        </Route>
                        <Route path={"/map"} exact>
                            <MapPage />
                        </Route>
                        <Route path={"/upload"} exact>
                            <UploadPage />
                        </Route>
                        <Route path={"/settings"} exact>
                            <SettingsPage/>
                        </Route>
                        <Route path={"/warnings"} exact>
                            <WarningsPage />
                        </Route>
                        <Route path={"/"}>
                            <HomePage/>
                        </Route>
                    </Switch>
                </Container>

                <Footer/>

            </MaterialThemeProvider>
        </Router>
    </div>
  );
}

export default App;
