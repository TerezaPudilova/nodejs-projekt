const jwt = require("jsonwebtoken");
const fs = require("fs");

import path from "path";
//import {jwt} from "jsonwebtoken"




module.exports = async (req, res, next) => {
  const cert = fs.readFileSync(
    path.resolve(__dirname, "../assets/public.pem"),
    "utf8"
  );
  const authHeader = req.get("Authorization");
 // console.log(authHeader);
  const token = authHeader.split(" ")[2];

  //logger.info(token);
  //logger.info(cert);

  // app.getAuth()
  // .verifyIdToken(token)
  // .then((decodedToken) => {
  //   const id = decodedToken.id;
  // })
  // .catch((error) => {
  //   console.error(error);
  // });

  //   const client = new OAuth2Client("angularbc-tereza-pudilova");

  //   async function verify() {
  //     const ticket = await client.verifyIdToken({
  //         idToken: token,
  //         audience: "angularbc-tereza-pudilova"
  //     });
  //     const payload = ticket.getPayload();
  //     return payload
  //   }

  let decodedToken;

  try {
    decodedToken = jwt.decode(token, { complete: true });
    // console.log(decodedToken)
    const userId = decodedToken.payload.user_id;
    const email = decodedToken.payload.email;
    //jwt.verify(token,cert, {audience: req.aud});
    //TODO: validace expiration date
    req.userId = userId;
    req.email = email;
    //console.log("Tento email je v decoded tokenu", email);
    // console.log(userId)
  } catch (error) {
    error.status = 500;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    throw error;
  }
  next();
};
