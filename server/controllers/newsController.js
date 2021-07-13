const Axios = require("axios");

exports.getNewsData = async (req, res) => {
    try {
        const token = process.env.STOCK_API_KEY;
        const url = `https://finnhub.io/api/v1/news?category=forex&token=${token}`;
        // console.log(url);
        const response = await Axios.get(url);
        return res.status(200).json({
            status: "success",
            data: response.data,
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
        });
    }
};
