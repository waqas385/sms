import express from "express";
import { get as connection } from "../dbconnection.js";
import jwt from "jsonwebtoken";
import { validateUser } from "./service.js";
import createError from "http-errors";

const router = express.Router();

function verifyJWT(req) {
  const accessToken = req.get(process.env.TOKEN_HEADER_KEY);
  const jwtSecretKey = process.env.JWT_SECRET_KEY
  if (!accessToken) {
    return false;
  }

  const bearerToken = accessToken.split(' ')[1];
  try {
    const verified = jwt.verify(bearerToken, jwtSecretKey);
    if (Object.keys(verified).length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log('JWT Verification Response Error: ', error.message);
    return false;
  }
}

router.post("/validate-access-token", async function (req, res, next) {
  try {
    if (verifyJWT(req)) {
      return res.json({
        type: 'success',
        status: 200,
        message: 'Token is verified'
      });
    }
  } catch (error) {
    next(createError(401));
  }
});


router.post("/login", async function (req, res, next) {
  try {
    const user = await validateUser(req.body.username, req.body.password, connection());
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const userDetails = {
      name: user.name,
      email: user.email,
      shop: user.shop,
      address: user.address,
      address1: user.address1,
      logo: user.logo,
      phoneNumber: user.phone_number
    };
    return res.json({
      ...userDetails,
      accessToken: jwt.sign(userDetails, jwtSecretKey)
    });
  } catch (error) {
    next(createError(401));
  }
});

router.get("*", async function (req, res, next) {
  if (!verifyJWT(req)) {
    return res.json({
      type: 'error',
      status: 498,
      message: 'Please provide valid access-token'
    });
  }
  // Validate user access-rights
  
  next();
});

router.post("*", async function (req, res, next) {
  if (!verifyJWT(req)) {
    return res.json({
      type: 'error',
      status: 498,
      message: 'Please provide valid access-token'
    });
  }
  // Validate user access-rights
  
  next();
});

export default router;