import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    IconButton,
    Box,
    Button,
    TextField,
    Container,
    Grid,
    Card,
    CardHeader,
    CardContent,
} from "@material-ui/core";
import { motion } from "framer-motion";
import CloseIcon from "@material-ui/icons/Close";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.1)",
    },
    form: {
        margin: "0 auto",
        width: "80%",
        marginTop: "20px",
    },

    confirm: {
        marginTop: "20px !important",
        marginBottom: "20px !important",
        backgroundColor: "rgba(0, 0, 255, 0.5) !important",
    },
    reset: {
        marginTop: "20px !important",
        marginBottom: "20px !important",
        marginRight: "20px !important",
        backgroundColor: "rgba(255, 0, 21, 0.6) !important",
    },
}));

const SettingsModal = ({ setSettingsOpen }) => {
    const classes = useStyles();
    return (
        <motion.div
            className={classes.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            id="backdrop"
        >
            <Container>
                <motion.div animate={{ opacity: 1, y: -20 }}>
                    <SettingsModalContent setSettingsOpen={setSettingsOpen} />
                </motion.div>
            </Container>
        </motion.div>
    );
};

const SettingsModalContent = ({ setSettingsOpen }) => {
    const classes = useStyles();
    const { authState, setAuthState } = useContext(AuthContext);
    const [activateSafetyButton, setActiveSafetyButton] = useState(false);

    const handleClick = () => {
        setSettingsOpen(false);
    };

    const handleResetOn = () => {
        setActiveSafetyButton(true);
    };

    const handleResetOff = () => {
        setActiveSafetyButton(false);
    };

    const resetAccount = async (e) => {
        e.preventDefault();

        const headers = {
            "x-auth-token": authState.token,
        };

        const url = `http://localhost:3001/api/stock/${authState.user.id}`;
        const response = await Axios.delete(url, {
            headers,
        });

        if (response.data.status === "success") {
            setAuthState({
                token: authState.token,
                user: response.data.user,
            });
            window.location.reload();
        }
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
        >
            <Box width="60vh" boxShadow={1}>
                <Card>
                    <CardHeader
                        action={
                            <IconButton
                                aria-label="Close"
                                onClick={handleClick}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    />
                    <CardContent>
                        <Typography component="h1" variant="h6" align="center">
                            Settings
                        </Typography>
                        <form
                            className={classes.form}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                disabled
                                id="Username"
                                label="Username"
                                name="Username"
                                autoComplete="Username"
                                value={authState.user.username}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                disabled
                                id="balance"
                                label="Cash Balance"
                                name="balance"
                                autoComplete="balance"
                                value={authState.user.balance}
                            />
                        </form>
                        <br />
                        <Box display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.reset}
                                onClick={handleResetOn}
                            >
                                Reset My Account
                            </Button>
                        </Box>
                        {activateSafetyButton && (
                            <div>
                                <Typography
                                    component="p"
                                    variant="caption"
                                    align="center"
                                >
                                    This is a permanent change. If you are sure
                                    press Reset.
                                </Typography>
                                <Box display="flex" justifyContent="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.reset}
                                        onClick={resetAccount}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.confirm}
                                        onClick={handleResetOff}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </div>
                        )}

                        <br />
                        <br />
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    );
};

export default SettingsModal;
