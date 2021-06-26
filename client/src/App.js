import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import PageTemplate from "./pages/PageTemplate";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";

const AuthenticatedRoute = ({ children, ...rest }) => {
    const authContext = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={() =>
                authContext.isAuthenticated() ? (
                    <>{children}</>
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

const AppRoutes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/signin">
                <SignIn />
            </Route>
            <AuthenticatedRoute path="/dashboard">
                <PageTemplate />
            </AuthenticatedRoute>
        </Switch>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <FetchProvider>
                    <AppRoutes />
                </FetchProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
