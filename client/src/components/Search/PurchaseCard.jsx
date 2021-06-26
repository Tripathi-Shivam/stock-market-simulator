import React from "react";
import { Grid, Typography, Card, Box, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    card: {
        margin: "0 2% !important",
        marginBottom: "45px !important",
    },
    addMargin: {
        marginTop: "20px !important",
    },
    submit: {
        marginTop: "20px !important",
        marginBottom: "20px !important",
        backgroundColor: "rgba(0, 0, 255, 0.5) !important",
    },
}));

const PurchaseCard = ({ setSelected, balance }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm component={Card} className={classes.card}>
            <br />
            <br />
            <Typography
                color="textSecondary"
                align="center"
                className={classes.addMargin}
            >
                Your Cash Balance:
            </Typography>
            <Typography variant="h6" align="center">
                {balance
                    ? "$" + balance.toLocaleString()
                    : "Balance Unavailable"}
            </Typography>
            <br />
            <br />
            <Typography
                variant="body2"
                align="center"
                className={classes.addMargin}
            >
                You have sufficient funds to buy this stock.
            </Typography>
            <Box display="flex" justifyContent="center">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => setSelected(true)}
                >
                    Open Purchase System
                </Button>
            </Box>
        </Grid>
    );
};

export default PurchaseCard;
