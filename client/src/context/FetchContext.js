import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
    const authContext = useContext(AuthContext);

    const authAxios = axios.create({
        baseURL: "http://localhost:3001/api/",
        headers: {
            "x-auth-token": `${authContext.authState.token}`,
            "Content-Type": "application/json",
        },
    });

    // authAxios.interceptors.request.use(
    //     (config) => {
    //         config.headers.Authorization = `Token ${authContext.authState.token}`;
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );

    return (
        <Provider
            value={{
                authAxios,
            }}
        >
            {children}
        </Provider>
    );
};

export { FetchContext, FetchProvider };
