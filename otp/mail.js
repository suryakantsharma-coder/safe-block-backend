const { ethers, Wallet } = require("ethers");
const app = require("express");
const router = app.Router();
const nodemailer = require("nodemailer");
const ABI = require("./abi.json");
require("dotenv").config();

async function mail(otp, exptime) {
  let testAccount = await nodemailer.createTestAccount();

 // creating fake server
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "genoveva18@ethereal.email",
      pass: "EDYgKeKAWSymjUuRWs",
    },
  });

  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "thejokesfactory.me@gmail.com", // list of receivers
      subject: "SMART CONTRACT WALLET", // Subject line
      text:
        "This is an OPT : " +
        otp +
        " Please do not share with anyone" +
        exptime, // plain text body
      html: "<b>Hello world?</b>", // html body
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("Message sent: %s", info.messageId);

  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

const setOTP = async (ownerAddress, otp, exp) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/" + process.env.PROVIDER
  );
  const privateKey =
    "80f35970ad0ce82144b6aa92fa45aa41840d5b775566200a14a0e3979c134f0f";
  const signer = new ethers.Wallet(privateKey, provider);
  // console.log(provider, signer);
  const contract = new ethers.Contract(
    process.env.OTP_CONTRACT_ADDRESS,
    ABI,
    signer
  );
  const otps = await contract.setOtp(
    ownerAddress,
    otp,
    exp,
    process.env.SERVER
  );
  console.log(otps);
  return otps;
};

const getOtp = () => {
  const otp = parseInt(Math.random(1000000) * 1000000);
  console.log(otp);
  if (otp > 99999) {
    return otp;
  } else {
    getOtp();
  }
};

router.get("/", async (req, res) => {
  try {
    const otp = getOtp();
    console.log(otp);
    const exptime = parseInt(new Date().getTime() / 1000) + 300;
    console.log(exptime);
    const data = await setOTP(
      "0x4bAecAd2C2ad9AD8B06Be25D7B83A5C0aCdE816E",
      otp,
      exptime
    );
    console.log(data);
    await mail(otp, exptime);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

module.exports = router;
