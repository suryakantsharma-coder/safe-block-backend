const router = require("express");
const { createUser, getUser } = require("./curd");
const { createUserSchema } = require("./schema");
const app = router.Router();

// For Creating User Result

async function createUsers(id, name, url, email, phoneNo, walletAddress) {
  const schema = Object.assign({}, createUserSchema);

  schema.id = id;
  schema.url = url;
  schema.name = name;
  schema.email = email;
  schema.phoneNo = phoneNo;
  schema.walletAddress = walletAddress;

  const res = await createUser(schema);
  return res;
}

// create an id

const getUserId = () => {
  return parseInt(Math.random(1000000000000000000) * 10000000000000000000);
};

// create users
app.get("/", (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    const res = createUsers(
      getUserId(),
      data.name,
      data.url,
      data.email,
      data.phoneNo,
      data.walletAddress
    );
    res.send(res);
  } catch (err) {
    res.send(err);
  }
});



// Get User By Email

app.get("/userInfo", async (req, res) => {
  try {
    const email = req.headers['email']
    const data = await getUser(email);
    console.log(data)
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
