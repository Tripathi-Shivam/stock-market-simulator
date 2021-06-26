import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const [authState, setAuthState] = useState({
        token,
        user: user ? JSON.parse(user) : {},
    });

    const setAuthInfo = ({ token, user }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setAuthState({ token, user });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthState({
            token: null,
            user: {},
        });
        history.push("signin");
    };

    const isAuthenticated = () => {
        if (!authState.token) {
            return false;
        }

        return true;
    };

    const isAdmin = () => {
        return authState.user.role === "admin";
    };

    return (
        <Provider
            value={{
                authState,
                setAuthState: (authInfo) => setAuthInfo(authInfo),
                isAuthenticated,
                logout,
                isAdmin,
            }}
        >
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider };
