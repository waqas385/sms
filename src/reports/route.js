import express from "express";
import { get as connection } from "../dbconnection.js";
import { getMinimumStockProducts, getExpiredProducts, getNearExpiryProducts, salesReport } from "./service.js";

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

router.get('/sales/:type?/:customer?/:from/:to', async function(req, res) {
  let salesType = req.params['type']; // type = 1 means Debit else Credit
  let fromDate = req.params['from'];
  let toDate = req.params['to'];
  let customerId = req.params['customer'];
  
  const result = await salesReport(connection(), salesType, fromDate, toDate, customerId);
  res.json(result);
})

export default router;