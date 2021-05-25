import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    const [authState, setAuthState] = useState({
        token,
        userInfo: userInfo ? JSON.parse(userInfo) : {},
    });

    const setAuthInfo = ({ token, userInfo }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setAuthState({ token, userInfo });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        setAuthState({
            token: null,
            userInfo: {},
        });
        history.push("/login");
    };

    const isAuthenticated = () => {
        if (!authState.token) {
            return false;
        }

        return true;
    };

    const isAdmin = () => {
        return authState.userInfo.role === "admin";
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
