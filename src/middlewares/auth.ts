const jwt = require("jsonwebtoken");
const fs = require("fs");

import path from "path";





module.exports = async (req, res, next) => {

  const authHeader = req.get("Authorization");

  const token = authHeader.split(" ")[2];

  let decodedToken;

  try {
    decodedToken = jwt.decode(token, { complete: true });
    const userId = decodedToken.payload.user_id;
    const email = decodedToken.payload.email;
    req.userId = userId;
    req.email = email;
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
