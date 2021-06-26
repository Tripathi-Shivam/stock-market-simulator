import React, { useContext, useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core/";
import Title from "../common/Title";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    positive: {
        color: "#10ac84 !important",
    },

    negative: {
        color: "#ff6b6b !important",
    },

    depositContext: {
        flex: 1,
    },

    addMargin: {
        marginTop: "20px",
    },
}));

const Balance = ({ purchasedStocks }) => {
    const classes = useStyles();
    const { authState } = useContext(AuthContext);
    const [portfolioBalance, setPortfolioBalance] = useState(0);

    const getPortfolioBalance = () => {
        let total = 0;
        purchasedStocks.forEach((stock) => {
            total += Number(stock.currentPrice) * Number(stock.quantity);
        });

        return Math.round((total + Number.EPSILON) * 100) / 100;
    };

    useEffect(() => {
        setPortfolioBalance(getPortfolioBalance());
    }, [purchasedStocks]);

    return (
        <React.Fragment>
            <Title>Current Balance</Title>
            <br />
            <div className={classes.depositContext}>
                <Typography color="textSecondary" align="center">
                    Cash Balance:
                </Typography>

                <Typography component="p" variant="h6" align="center">
                    $
                    {authState
                        ? authState.user.balance.toLocaleString()
                        : "$---"}
                </Typography>
                <Typography color="textSecondary" align="center">
                    Portfolio Balance:
                </Typography>

                <Typography
                    component="p"
                    variant="h6"
                    align="center"
                    gutterBottom
                >
                    ${portfolioBalance.toLocaleString()}
                </Typography>
                <div className={classes.addMargin}>
                    <Typography color="textSecondary" align="center">
                        Total:
                    </Typography>

                    <Typography
                        component="p"
                        variant="h4"
                        align="center"
                        className={
                            Number(authState.user.balance + portfolioBalance) >=
                            100000
                                ? classes.positive
                                : classes.negative
                        }
                    >
                        $
                        {authState
                            ? (
                                  authState.user.balance + portfolioBalance
                              ).toLocaleString()
                            : "---"}
                    </Typography>
                </div>
            </div>
            <div>
                <Typography color="textSecondary" align="center">
                    {new Date().toDateString()}
                </Typography>
            </div>
        </React.Fragment>
    );
};

export default Balance;
