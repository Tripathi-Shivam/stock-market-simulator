import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
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
import { makeStyles } from "@material-ui/core/styles";
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
}));

const SaleModal = ({ setSaleOpen, stock }) => {
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
                    <SaleModalContent setSaleOpen={setSaleOpen} stock={stock} />
                </motion.div>
            </Container>
        </motion.div>
    );
};

const SaleModalContent = ({ setSaleOpen, stock }) => {
    const { authState, setAuthState } = useContext(AuthContext);
    const [quantity, setQuantity] = useState(1);
    const classes = useStyles();
    const handleQuantityChange = (e) => {
        if (
            !isNaN(e.target.value) &&
            Number(e.target.value) <= stock.quantity
        ) {
            setQuantity(e.target.value);
        }
    };

    const handleClick = () => {
        setSaleOpen(false);
    };

    const sellStock = async (e) => {
        e.preventDefault();

        const headers = {
            "x-auth-token": authState.token,
        };

        const data = {
            stockId: stock.id,
            quantity: Number(quantity),
            userId: authState.user.id,
            price: Number(stock.currentPrice),
        };

        const url = "http://localhost:3001/api/stock";
        const response = await Axios.patch(url, data, {
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
                            Sell
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
                                id="name"
                                label="Name"
                                name="Name"
                                autoComplete="Name"
                                value={stock.name}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                disabled
                                id="price"
                                label="Price"
                                name="price"
                                autoComplete="price"
                                value={stock.currentPrice}
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
                        </form>
                        <br />
                        <Box display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.confirm}
                                onClick={sellStock}
                            >
                                Confirm
                            </Button>
                        </Box>

                        <br />
                        <br />
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    );
};

export default SaleModal;
