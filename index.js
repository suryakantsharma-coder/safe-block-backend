const express = require("express");
const app = express();
const port = 4000;


app.get("/", (req, res) => {
//   console.log(req?.header);
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
