import React, { useContext, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
    MdDashboard,
    MdExitToApp,
    MdSettings,
    MdInfoOutline,
    MdShoppingCart,
} from "react-icons/md";
import { IconContext } from "react-icons";
import { List } from "@material-ui/core";
import { AuthContext } from "../context/AuthContext";
import clsx from "clsx";

const Sidebar = () => {
    const authContext = useContext(AuthContext);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        console.log(event);
        if (index === 4) {
            authContext.logout();
        }
    };

    return (
        <React.Fragment>
            <IconContext.Provider value={{ size: "2em", color: "black" }}>
                <div>
                    <List>
                        <div className="py-4">
                            <ListItem
                                button
                                onClick={(event) =>
                                    handleListItemClick(event, 0)
                                }
                            >
                                <ListItemIcon>
                                    <MdDashboard />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                        </div>
                        <ListItem
                            button
                            style={{ paddingBottom: "2em", paddingTop: "2em" }}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon>
                                <MdShoppingCart />
                            </ListItemIcon>
                            <ListItemText primary="Buy Stocks" />
                        </ListItem>
                        <ListItem
                            button
                            style={{ paddingBottom: "2em", paddingTop: "2em" }}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemIcon>
                                <MdSettings />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListItem
                            button
                            style={{ paddingBottom: "2em", paddingTop: "2em" }}
                            onClick={(event) => handleListItemClick(event, 3)}
                        >
                            <ListItemIcon>
                                <MdInfoOutline />
                            </ListItemIcon>
                            <ListItemText primary="News" />
                        </ListItem>
                        <ListItem
                            button
                            style={{ paddingBottom: "2em", paddingTop: "2em" }}
                            onClick={(event) => handleListItemClick(event, 4)}
                        >
                            <ListItemIcon>
                                <MdExitToApp />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </div>
            </IconContext.Provider>
        </React.Fragment>
    );
};

export default Sidebar;
