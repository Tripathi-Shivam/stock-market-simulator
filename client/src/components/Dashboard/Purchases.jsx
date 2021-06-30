import React, { useState } from "react";
import { Link } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../common/Title.jsx";
import SaleModal from "./SaleModal";
import { makeStyles } from "@material-ui/core/";

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

const Purchases = ({ purchasedStocks }) => {
    const classes = useStyles();
    const [saleOpen, setSaleOpen] = useState(false);
    const [stock, setStock] = useState(undefined);

    const roundNumber = (num) => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    };

    const openSaleModal = (stock) => {
        setStock(stock);
        setSaleOpen(true);
    };

    return (
        <React.Fragment>
            <div style={{ minHeight: "200px" }}>
                <Title>Stocks in Your Portfolio</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Company Ticker</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price of Purchase</TableCell>
                            <TableCell>Purchase Total</TableCell>
                            <TableCell align="right">Current Price</TableCell>
                            <TableCell align="right">Current Total</TableCell>
                            <TableCell align="right">Difference</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purchasedStocks.map((row) => {
                            const difference =
                                (row.currentPrice - row.purchasePrice) /
                                row.currentPrice;
                            const purchaseTotal =
                                Number(row.quantity) *
                                Number(row.purchasePrice);
                            const currentTotal =
                                Number(row.quantity) * Number(row.currentPrice);
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Link
                                            onClick={() => openSaleModal(row)}
                                        >
                                            {row.ticker}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.name || "----"}</TableCell>
                                    <TableCell>
                                        {row.quantity || "----"}
                                    </TableCell>
                                    <TableCell align="right">
                                        $
                                        {row.purchasePrice.toLocaleString() ||
                                            "----"}
                                    </TableCell>
                                    <TableCell align="right">
                                        $
                                        {roundNumber(
                                            purchaseTotal
                                        ).toLocaleString() || "----"}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={
                                            row.currentPrice >=
                                            row.purchasePrice
                                                ? classes.positive
                                                : classes.negative
                                        }
                                    >
                                        $
                                        {row.currentPrice.toLocaleString() ||
                                            "----"}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={
                                            currentTotal >= purchaseTotal
                                                ? classes.positive
                                                : classes.negative
                                        }
                                    >
                                        $
                                        {roundNumber(
                                            currentTotal
                                        ).toLocaleString() || "----"}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={
                                            difference >= 0
                                                ? classes.positive
                                                : classes.negative
                                        }
                                    >
                                        {difference >= 0 ? "▲" : "▼"}{" "}
                                        {Math.abs(difference * 100).toFixed(2)}%
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {saleOpen && stock && (
                    <SaleModal setSaleOpen={setSaleOpen} stock={stock} />
                )}
            </div>
        </React.Fragment>
    );
};

export default Purchases;
