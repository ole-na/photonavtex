import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Container from '@material-ui/core/Container';

import './css/App.css';
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
import LoginPage from "./pages/LoginPage";
import TypeAndAuthProvider from "./components/login/context/TypeAndAuthProvider";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./routing/PrivateRoute";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            light: cyan[500],
            main: cyan[700],
            contrastText: '#ffffff',
        },
    },
    typography: { useNextVariants: true },
});

function App() {
  return (
    <div className="app">
        <Router>
            <TypeAndAuthProvider>
                <MaterialThemeProvider theme={theme}>

                    <HeaderAppBar />

                    <Container className="app-content-container">
                        <Switch>
                            <Route path={"/login"} exact>
                                <LoginPage />
                            </Route>
                            <Route path={"/signup"} exact>
                                <SignupPage />
                            </Route>
                            <Route path={"/about"} exact>
                                <AboutPage />
                            </Route>
                            <Route path={"/help"} exact>
                                <HelpPage/>
                            </Route>
                            <PrivateRoute path={"/map"} exact>
                                <MapPage />
                            </PrivateRoute>
                            <PrivateRoute path={"/upload"} exact>
                                <UploadPage />
                            </PrivateRoute>
                            <PrivateRoute path={"/settings"}>
                                <SettingsPage/>
                            </PrivateRoute>
                            <PrivateRoute path={"/warnings"} exact>
                                <WarningsPage />
                            </PrivateRoute>
                            <Route path={["/home", "/"]}>
                                <HomePage/>
                            </Route>
                        </Switch>
                    </Container>

                    <Footer/>

                </MaterialThemeProvider>
            </TypeAndAuthProvider>
        </Router>
    </div>
  );
}

export default App;
