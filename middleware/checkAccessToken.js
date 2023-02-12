const { default: jwtDecode } = require("jwt-decode");

const checkAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers["api-key"] || null;
    console.log(accessToken)
    if (accessToken == null) throw("PLease Enter AccessToken");
    const decode = jwtDecode(accessToken);
    const currentTime = parseInt(new Date().getTime() / 1000);
    if (decode.exp >= currentTime) next();
    else return res.send("token expired");
  } catch (err) {
    res.send(err);
  }
};


module.exports = checkAccessToken;