import express from "express";
import { get as connection } from "../dbconnection.js";
import { getMinimumStockProducts, getExpiredProducts, getNearExpiryProducts } from "./service.js";

const router = express.Router();

router.get('/minimum-stock', async function(req, res) {
  const result = await getMinimumStockProducts(connection());
  res.json(result);
})

router.get('/expired-products', async function(req, res) {
  const result = await getExpiredProducts(connection());
  res.json(result);
})

router.get('/near-expire-products', async function(req, res) {
  const result = await getNearExpiryProducts(connection());
  res.json(result);
})

export default router;