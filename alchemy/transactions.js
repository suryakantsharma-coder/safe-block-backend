const { default: axios } = require("axios");
const router = require("express");
const moment = require("moment/moment");
const app = router.Router();
const sdk = require("api")("@alchemy-docs/v1.0#3yq3itl9spoxpx");

const getSendTransaction = async () => {
  //     curl --request POST \
  //      --url https://polygon-mumbai.g.alchemy.com/v2/docs-demo \
  //      --header 'accept: application/json' \
  //      --header 'content-type: application/json' \
  //      --data '
  // {
  //      "id": 1,
  //      "jsonrpc": "2.0",
  //      "method": "alchemy_getAssetTransfers",
  //      "params": [
  //           {
  //                "fromBlock": "0x0",
  //                "toBlock": "latest",
  //                "toAddress": "0x4bAecAd2C2ad9AD8B06Be25D7B83A5C0aCdE816E",
  //                "category": [
  //                     "external"
  //                ],
  //                "withMetadata": false,
  //                "excludeZeroValue": true,
  //                "maxCount": "0x3e8"
  //           }
  //      ]
  // }

  axios
    .post("https://polygon-mumbai.g.alchemy.com/v2/docs-demo")
    .then(() => {});
  const values = data?.data?.result?.transfers;

  return values;
};

const sendTransaction = async (address) => {
  let data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: "0x0",
        toBlock: "latest",
        fromAddress: `${address}`,
        excludeZeroValue: true,
        category: ["external", "erc721", "erc1155", "erc20"],
        withMetadata: true,
        maxCount: "0x" + (100).toString(16),
      },
    ],
  });

  let baseURL =
    "https://polygon-mumbai.g.alchemy.com/v2/9TkC9Ptorn03cBGhp4fv56qocfZJllMo";

  const axiosURL = `${baseURL}`;

  var config = {
    method: "post",
    url: axiosURL,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const res = await axios(config);

  const arr1 = res.data?.result?.transfers.map((object) => {
    return { ...object, chain: "polygon-mumbai", type: "send" };
  });

  return [...arr1];
};

const ReceiveTransaction = async (address) => {
  let data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: "0x0",
        toBlock: "latest",
        toAddress: `${address}`,
        excludeZeroValue: true,
        category: ["external", "erc721", "erc1155", "erc20"],
        withMetadata: true,
        maxCount: "0x" + (100).toString(16),
      },
    ],
  });

  let baseURL =
    "https://polygon-mumbai.g.alchemy.com/v2/9TkC9Ptorn03cBGhp4fv56qocfZJllMo";

  const axiosURL = `${baseURL}`;

  var config = {
    method: "post",
    url: axiosURL,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const res = await axios(config);

  const arr1 = res.data?.result?.transfers.map((object) => {
    return { ...object, chain: "polygon-mumbai", type: "send" };
  });

  return [...arr1];
};

function mergeArraysByDate(array1, array2) {
  let result = [];
  let index1 = 0;
  let index2 = 0;

  // sort both arrays by date
  // array1.sort((a, b) => new Date(a.date) - new Date(b.date));
  // array2.sort((a, b) => new Date(a.date) - new Date(b.date));
  array1.sort(
    (a, b) =>
      moment(a.data).format("YYYY-MM-DD") - moment(b.data).format("YYYY-MM-DD")
  );
  array2.sort(
    (a, b) =>
      moment(a.data).format("YYYY-MM-DD") - moment(b.data).format("YYYY-MM-DD")
  );

  while (index1 < array1.length && index2 < array2.length) {
    let date1 = new Date(array1[index1].date);
    let date2 = new Date(array2[index2].date);

    // compare the dates and add the object with the earlier date to the result array
    if (date1 < date2) {
      result.push(array1[index1]);
      index1++;
    } else {
      result.push(array2[index2]);
      index2++;
    }
  }

  // add the remaining elements from array1 or array2 to the result array
  while (index1 < array1.length) {
    result.push(array1[index1]);
    index1++;
  }
  while (index2 < array2.length) {
    result.push(array2[index2]);
    index2++;
  }

  return result;
}

app.get("/", async (req, res) => {
  try {
    const address = req.query["address"];
    const send = await sendTransaction(address);
    const receive = await ReceiveTransaction(address);
    console.log(send);
    const merge = await mergeArraysByDate(send, receive);
    res.send(merge);
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
