import express from "express";
import { get as connection } from "../dbconnection.js";
import { list, insert, update, deleteProduct, getProduct, getProductByName, search } from "./controller.js";

const router = express.Router();

router.get("/list/:searchText?/:page?", async function (req, res) {
  const result = await list(connection(), req);
  res.json(result);
});

router.get("/search/:searchText?", async function (req, res) {
  const result = await search(connection(), req);
  res.json(result);
});

router.get("/:id", async function(req, res) {
  const result = await getProduct(connection(), req);
  res.json(result);
})

router.post("/create", async function(req, res) {
  const result = await insert(connection(), req.body);
  res.json(result);
});

router.put("/update", async function(req, res) {
  const result = await update(connection(), req.body);
  res.json(result);
});

router.delete("/delete/:id", async function(req, res) {
  const result = await deleteProduct(connection(), req);
  res.json(result);
});

router.get("/get/:name", async function(req, res){
  const product = await getProductByName(connection(), req);
  res.json(product);
});

router.post("/upload-file", async function(req, res) {
  // TODO add logic to validate & upload excel file
})

router.post("/create-products-from-file", async function(req, res) {
  // TODO
  // Add validation for uploaded file name
  // Add logic to insert products from uploaded file
});

export default router;
