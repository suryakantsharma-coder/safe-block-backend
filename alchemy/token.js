const { default: axios } = require("axios");
const express = require("express");
const app = express.Router();
require("dotenv").config();

const tokenByUser = async (address) => {
  const options = {
    method: "POST",
    url: "https://polygon-mumbai.g.alchemy.com/v2/" + process.env.PROVIDER,
    headers: { accept: "application/json", "content-type": "application/json" },
    data: {
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [address],
    },
  };

  const response = await axios.request(options);
  console.log(response.data);
  return response.data.result
};

app.get("/", async (req, res) => {
  try {
    const address = req.query["address"];
    const data = await tokenByUser(address);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = app;
