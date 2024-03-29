import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import {
    Container,
    createMuiTheme,
    CssBaseline,
    makeStyles,
    TextField,
    ThemeProvider,
    Typography,
    Button,
} from "@material-ui/core";

import { validEmail } from "../components/regex";
import { publicFetch } from "../util/fetch.js";
import { AuthContext } from "../context/AuthContext";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0353A4",
        },
    },
});

const useStyle = makeStyles({
    root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        color: "#0353A4",
        fontWeight: "bold",
    },
    textBox: {
        width: "60vh",
        margin: "20px 0px 0px 0px",
    },
    link: {
        textDecoration: "none",
    },
    signup: {
        display: "block",
        width: "60vh",
        backgroundColor: "#0353A4",
        color: "white",
        fontWeight: "bold",
        padding: "10px 25px",
        borderRadius: "5px",
        fontSize: "20px",
        margin: "20px 0px 0px 0px",
        "&:hover": {
            backgroundColor: "#034d96",
        },
    },
    signin: {
        margin: "20px 0px 0px 0px",
        color: "#0466C8",
    },
    success: {
        backgroundColor: "#d4edda",
        //fontWeight: "bold",
        color: "#155724",
        padding: "10px",
        display: "block",
    },
    fail: {
        backgroundColor: "#f8d7da",
        //fontWeight: "bold",
        color: "#721c24",
        padding: "10px",
        display: "block",
    },
});

const SignIn = () => {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [redirectOnLogin, setRedirectOnLogin] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validate = () => {
        if (!email) {
            setErrorMessage("Email is required");
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
            return false;
        }
        if (!password) {
            setErrorMessage("Password is required");
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
            return false;
        }
        if (!validEmail.test(email)) {
            setErrorMessage("Invalid email");
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
            return false;
        }
        return true;
    };

    const clearFields = () => {
        setEmail("");
        setPassword("");
        setErrorMessage("");
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            const credentials = {
                email,
                password,
            };
            try {
                const response = await publicFetch.post(
                    "auth/login",
                    credentials
                );
                console.log(response);
                if (response.data.status === "fail") {
                    setErrorMessage(response.data.message);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 2000);
                } else {
                    authContext.setAuthState(response.data);
                    clearFields();
                    // setTimeout(() => {
                    //     setRedirectOnLogin(true);
                    // }, 1000);
                    setRedirectOnLogin(true);
                }
                // setSuccessMessage(data.message);
            } catch (error) {
                setErrorMessage("Front end error message");
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000);
            }
        }
    };

    const classes = useStyle();
    return (
        <React.Fragment>
            {authContext.isAuthenticated() && <Redirect to="/dashboard" />}

            {redirectOnLogin && <Redirect to="/dashboard" />}
            {/* {successMessage && (
                <Typography
                    id="successfull"
                    variant="h6"
                    align="center"
                    className={classes.success}
                >
                    {successMessage}
                </Typography>
            )} */}

            {errorMessage && (
                <Typography
                    id="failed"
                    variant="h6"
                    align="center"
                    className={classes.fail}
                >
                    {errorMessage}
                </Typography>
            )}
            <CssBaseline />
            <div className={classes.root}>
                <Container>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4" className={classes.title}>
                            Sign In
                        </Typography>

                        <form
                            className={classes.form}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="email"
                                label="Email Id"
                                variant="outlined"
                                color="primary"
                                className={classes.textBox}
                                onChange={(e) => {
                                    handleEmailChange(e);
                                }}
                            />
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                color="primary"
                                type="password"
                                className={classes.textBox}
                                onChange={(e) => {
                                    handlePasswordChange(e);
                                }}
                            />
                            <Button
                                className={classes.signup}
                                variant="contained"
                                size="large"
                                onClick={onSubmit}
                            >
                                Sign in
                            </Button>
                            <Link to="/signup" className={classes.link}>
                                <Typography className={classes.signin}>
                                    Don’t have an account? Sign up
                                </Typography>
                            </Link>
                        </form>
                    </ThemeProvider>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default SignIn;
