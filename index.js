const bodyParser = require("body-parser");
const express = require("express");
const checkAccessToken = require("./middleware/checkAccessToken");

const app = express();
const port = 4000;



app.post("/", checkAccessToken, (req, res) => {
  console.log(req?.header);
  res.send("Welcome to safe-block");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use("/otp", require("./OTP/mail"));
app.use("/create",  require("./auth/createUser"));
app.use("/tx",  require("./alchemy/transactions"));
app.use("/nft",  require("./alchemy/nft"));
app.use("/token",  require("./alchemy/token"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
