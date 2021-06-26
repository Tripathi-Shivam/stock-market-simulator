import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
    CardContent,
    CardHeader,
    IconButton,
    Grid,
    Card,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
// import styles from "./Search.module.css";
import { motion } from "framer-motion";
import Axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

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

    addMargin: {
        marginTop: "20px !important",
    },
    submit: {
        marginTop: "20px !important",
        marginBottom: "20px !important",
        backgroundColor: "rgba(0, 0, 255, 0.5) !important",
    },
}));

const PurchaseModal = ({
    setSelected,
    stockInfo,
    pastDay,
    setPurchasedStocks,
    purchasedStocks,
}) => {
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
                    <PurchaseModalContent
                        stockInfo={stockInfo}
                        pastDay={pastDay}
                        setSelected={setSelected}
                        setPurchasedStocks={setPurchasedStocks}
                        purchasedStocks={purchasedStocks}
                    />
                </motion.div>
            </Container>
        </motion.div>
    );
};

const PurchaseModalContent = ({
    setSelected,
    stockInfo,
    pastDay,
    setPurchasedStocks,
    purchasedStocks,
}) => {
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(Number(pastDay.adjClose));
    const { authState } = useContext(AuthContext);
    const classes = useStyles();

    const handleQuantityChange = (e) => {
        if (!isNaN(e.target.value)) {
            if (
                authState.user.balance -
                    Number(pastDay.adjClose) * Number(e.target.value) <
                0
            ) {
                return;
            }

            setQuantity(e.target.value);
            setTotal(
                Math.round(
                    (Number(pastDay.adjClose) * Number(e.target.value) +
                        Number.EPSILON) *
                        100
                ) / 100
            );
        }
    };

    const handleClick = (e) => {
        setSelected(false);
    };

    const handlePurchase = async (e) => {
        e.preventDefault();

        const headers = {
            "x-auth-token": authState.token,
        };

        const purchase = {
            userId: authState.user.id,
            ticker: stockInfo.ticker,
            quantity: Number(quantity),
            price: pastDay.adjClose,
        };

        const url = "http://localhost:3001/api/stock";
        const response = await Axios.post(url, purchase, {
            headers,
        });

        if (response.data.status === "success") {
            setSelected(false);

            const newStock = {
                id: response.data.stockId,
                ticker: stockInfo.ticker,
                name: stockInfo.name,
                purchasePrice: pastDay.adjClose,
                purchaseDate: new Date(),
                quantity: Number(quantity),
                currentDate: new Date(),
                currentPrice: pastDay.adjClose,
            };
            const newPurchasedStocks = [...purchasedStocks, newStock];
            setPurchasedStocks(newPurchasedStocks);
        } else {
            console.log("Couldn't purchase stock.");
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
                            Purchase {stockInfo.name} Stock
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
                                id="stock"
                                label="Stock Name"
                                name="stock"
                                autoComplete="stock"
                                value={stockInfo.name}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                disabled
                                id="price"
                                label="Stock Price"
                                name="price"
                                autoComplete="price"
                                value={pastDay.adjClose}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="quantity"
                                label="Quantity"
                                name="quantity"
                                autoComplete="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                            />
                            <Typography
                                variant="body2"
                                align="center"
                                className={classes.addMargin}
                            >
                                Total = ${total.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" align="center">
                                Cash Balance after purchase:{" "}
                                {authState
                                    ? "$" +
                                      (
                                          authState.user.balance - total
                                      ).toLocaleString()
                                    : "Balance Unavailable"}
                            </Typography>
                            <Box display="flex" justifyContent="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handlePurchase}
                                >
                                    Confirm
                                </Button>
                            </Box>
                        </form>
                        <br />
                        <br />
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    );
};

export default PurchaseModal;
