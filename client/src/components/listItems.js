import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import {
    MdDashboard,
    MdAssignment,
    MdSearch,
    MdExitToApp,
    MdSettings,
    MdInfoOutline,
    MdShoppingCart,
} from "react-icons/md";
import { IconContext } from "react-icons";

export const mainListItems = (
    <IconContext.Provider value={{ size: "2em", color: "black" }}>
        <div>
            <ListItem button style={{ paddingBottom: "2em" }}>
                <ListItemIcon>
                    <MdDashboard size="2em" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button style={{ paddingBottom: "2em" }}>
                <ListItemIcon>
                    <MdShoppingCart />
                </ListItemIcon>
                <ListItemText primary="Buy Stocks" />
            </ListItem>
            <ListItem button style={{ paddingBottom: "2em" }}>
                <ListItemIcon>
                    <MdSettings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button style={{ paddingBottom: "2em" }}>
                <ListItemIcon>
                    <MdInfoOutline />
                </ListItemIcon>
                <ListItemText primary="News" />
            </ListItem>
            <ListItem button style={{ paddingBottom: "2em" }}>
                <ListItemIcon>
                    <MdExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </div>
    </IconContext.Provider>
);

export const secondaryListItems = (
    <IconContext.Provider value={{ size: "2em" }}>
        <div>
            <ListSubheader inset>Saved reports</ListSubheader>
            <ListItem button>
                <ListItemIcon>
                    <MdAssignment />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <MdAssignment />
                </ListItemIcon>
                <ListItemText primary="Last quarter" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <MdAssignment />
                </ListItemIcon>
                <ListItemText primary="Year-end sale" />
            </ListItem>
        </div>
    </IconContext.Provider>
);
