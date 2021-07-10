import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";

// import { useHistory } from "react-router-dom";
// import { FetchContext } from "../context/FetchContext";
import { AuthContext } from "../context/AuthContext";

import {
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { FaUserCircle } from "react-icons/fa";
import { Icon } from "@material-ui/core";

import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/common/Navbar";
import SecondNavbar from "../components/common/SecondNavbar";
import Dashboard from "../components/Dashboard/Dashboard";
import Search from "../components/Search/Search";
import SettingsModal from "./SettingsModal";
import News from "../components/News/News";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBarSpacer: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    menuButton: {
        marginRight: 36,
    },

    menuButtonHidden: {
        display: "none",
    },
}));

const PageTemplate = () => {
    const authContext = useContext(AuthContext);
    // const fetchContext = useContext(FetchContext);
    // const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [purchasedStocks, setPurchasedStocks] = useState([]);

    const getPurchasedStocks = async () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const url = `http://localhost:3001/api/stock/${userData.id}`;
        const headers = {
            "x-auth-token": token,
        };
        const response = await Axios.get(url, {
            headers,
        });

        console.log(response);
        if (response.data.status === "success") {
            setPurchasedStocks(response.data.stocks);
        }
    };
    useEffect(() => {
        getPurchasedStocks();
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const openSettings = () => {
        setSettingsOpen(true);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(
                    classes.appBarBackground,
                    classes.appBar,
                    open && classes.appBarShift
                )}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className="flex-grow"
                    >
                        {currentPage === "dashboard" && "Dashboard"}
                        {currentPage === "news" && "Market News"}
                        {currentPage === "search" && "Search"}
                    </Typography>
                    <Icon color="inherit" className="mr-3">
                        <FaUserCircle />
                    </Icon>

                    <Typography variant="h6">
                        Hello,{" "}
                        {authContext.authState.user
                            ? authContext.authState.user.username
                                  .charAt(0)
                                  .toUpperCase() +
                              authContext.authState.user.username.slice(1)
                            : ""}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    ),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Navbar
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </List>
                <Divider />
                <List>
                    <SecondNavbar
                        logout={authContext.logout}
                        openSettings={openSettings}
                    />
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {currentPage === "dashboard" && (
                    <Dashboard purchasedStocks={purchasedStocks} />
                    // <div>Dashboard</div>
                )}
                {currentPage === "news" && <News />}
                {currentPage === "search" && (
                    <Search
                        setPurchasedStocks={setPurchasedStocks}
                        purchasedStocks={purchasedStocks}
                    />
                )}
                {settingsOpen && (
                    <SettingsModal setSettingsOpen={setSettingsOpen} />
                )}
            </main>
        </div>
    );
};

export default PageTemplate;
