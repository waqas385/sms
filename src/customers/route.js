import express from "express";
import { get as connection } from "../dbconnection.js";
import { getCustomers, insert, deleteCustomer, update, getCustomerDetail } from "./service.js";
import types from "../utils/returnTypes.js";

const router = express.Router();

router.get("/:id", async function(req, res) {
  let categories = await getCustomerDetail(connection(), req.params["id"]);
  res.json(categories);
});

router.get("/", async function(req, res) {
  let sections = await getCustomers(connection());
  res.json(sections);
});

router.get("/search/:searchText?", async function (req, res) {
  const searchText = req.params["searchText"] || ""
  const result = await getCustomers(connection(), searchText);
  res.json(result);
});

router.post("/create", async function(req, res) {
  let response = {};
  try {
    response.result = await insert(connection(), req.body);
    response.message = {
      text: 'Customer created successfully',
      type: types.SUCCESS
    }
  } catch (error) {
    response.message = {
      text: error.message,
      type: types.ERROR
    }
  }
  res.json(response);
});

router.delete("/delete/:id", async function(req, res) {
  let response = {};
  try {
    await deleteCustomer(connection(), req.params["id"]);
    response.message = {
      text: 'Customer deleted successfully',
      type: types.SUCCESS
    }
  } catch (error) {
    response.message = {
      text: error.message,
      type: types.ERROR
    }
  }
  res.json(response);
});

router.put("/update", async function(req, res) {
  let response = {};
  try {
    await update(connection(), req.body, req.body.id);
    response.message = {
      text: 'Customer updated successfully',
      type: types.SUCCESS
    }
  } catch (error) {
    response.message = {
      text: error.message,
      type: types.ERROR
    }
  }
  res.json(response);
});

export default router;