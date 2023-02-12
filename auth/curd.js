const db = require("../firebase");

const createUser = async (data) => {
  const res = await db.collection("users").doc(data.email).set(data);
  return res;
};

const getUser = async (email) => {
  const cityRef = db.collection("users").doc(email);
  const doc = await cityRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
    return doc.data();
  }
};

module.exports = { createUser, getUser };
