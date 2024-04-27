import express from "express";
import { get as connection } from "../dbconnection.js";
import { insert, list, detail } from "./controller.js";

const router = express.Router();


router.get("/detail/:id", async function (req, res) {
  console.log('TESTING asddasd');
  const result = await detail(connection(), req);
  res.json(result);
});

router.post("/create", async function (req, res) {
  const result = await insert(connection(), req);
  res.json(result);
});

router.get("/:from/:to/:page?", async function (req, res) {
  const result = await list(connection(), req);
  res.json(result);
});

export default router;
