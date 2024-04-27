import express from "express";
import { get as connection } from "../dbconnection.js";
import { getCategories, insert, deleteCategory, update, getCategoryDetail } from "./service.js";
import types from "../utils/returnTypes.js";

const router = express.Router();

router.get("/:id", async function(req, res) {
  let categories = await getCategoryDetail(connection(), req.params["id"]);
  res.json(categories);
});

router.get("/", async function(req, res) {
  let categories = await getCategories(connection());
  res.json(categories);
});

router.post("/create", async function(req, res) {
  let response = {};
  try {
    response.result = await insert(connection(), req.body.name);
    response.message = {
      text: 'Category created successfully',
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
    await deleteCategory(connection(), req.params["id"]);
    response.message = {
      text: 'Category deleted successfully',
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
    await update(connection(), req.body.name, req.body.id);
    response.message = {
      text: 'Category updated successfully',
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