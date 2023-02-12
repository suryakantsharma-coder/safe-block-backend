const { default: axios } = require("axios");
const express = require("express");
const app = express.Router();
require("dotenv").config();

const getUsersNft = async (address) => {
  const options = {
    method: "GET",
    url:
      "https://polygon-mumbai.g.alchemy.com/nft/v2/" +
      process.env.PROVIDER +
      "/getNFTs",
    params: { owner: address },
    headers: { accept: "application/json" },
  };

  const response = await axios.request(options);
  console.log(response.data);
  return response.data;
};

const getNFTMetadata = async (tokens) => {
  const options = {
    method: "POST",
    url:
      "https://polygon-mumbai.g.alchemy.com/nft/v2/" +
      process.env.PROVIDER +
      "/getNFTMetadataBatch",
    headers: { accept: "application/json", "content-type": "application/json" },
    data: {
      tokens: tokens, //[{ contractAddress: "response", tokenId: "sa" }]
      refreshCache: false,
    },
  };

  const response = await axios.request(options).catch((err) => {console.log(err)});
  console.log(response.data);
  return response.data;
};

app.get("/", async (req, res) => {
  try {
    const address = req.query["address"];
    const data = await getUsersNft(address);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/metadata", async (req, res) => {
  try {
    const address = req.query["address"];
    const data = await getUsersNft(address);
    const queryData = data.ownedNfts.map((item) => {
      return { contractAddress: item.contract.address, tokenId: parseInt(item.id.tokenId) };
    });
    const metadata = await getNFTMetadata(queryData);
    console.log(queryData)
    res.send(metadata);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = app;
