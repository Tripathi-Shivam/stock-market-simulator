import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import background from "../images/background.png";
import watermark from "../images/watermark4.png";
import { Link } from "react-router-dom";
import { Button, Container, CssBaseline, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minHeight: "100vh",
        minWidth: "100vh",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        alignItems: "center",
    },
    image: {
        minHeight: "100vh",
        minWidth: "100vh",
        backgroundImage: `url(${watermark})`,
        backgroundSize: "60%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    hero: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    desc: {
        color: "white",
        textAlign: "center",
        margin: "50px 0px",
    },
    signup: {
        backgroundColor: "#002855",
        color: "white",
        fontWeight: "bold",
        padding: "10px 25px",
        borderRadius: "10px",
        fontSize: "20px",
        margin: "0px 10px",
        "&:hover": {
            backgroundColor: "#002652",
        },
    },
    signin: {
        backgroundColor: "white",
        color: "#002855",
        fontWeight: "bold",
        padding: "10px 25px",
        borderRadius: "10px",
        fontSize: "20px",
        margin: "0px 10px",
    },
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    link: {
        textDecoration: "none",
    },
});

const Home = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <div className={classes.image}>
                    <div className={classes.hero}>
                        <Container>
                            <Typography variant="h2" className={classes.title}>
                                Stock Market Simulator
                            </Typography>
                            <Typography variant="h5" className={classes.desc}>
                                Don’t want to loose your money while learning
                                stock market? Sign up with us to get experience
                                about the real market without loosing actual
                                money.
                            </Typography>
                            <div className={classes.button}>
                                <Link to="/signup" className={classes.link}>
                                    <Button
                                        className={classes.signup}
                                        variant="contained"
                                        size="large"
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                                <Link to="/signin" className={classes.link}>
                                    <Button
                                        className={classes.signin}
                                        variant="contained"
                                        size="large"
                                    >
                                        Sign in
                                    </Button>
                                </Link>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
