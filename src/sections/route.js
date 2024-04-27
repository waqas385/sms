import express from "express";
import { get as connection } from "../dbconnection.js";
import { getSections, insert, deleteSection, update, getSectionDetail } from "./service.js";
import types from "../utils/returnTypes.js";

const router = express.Router();

router.get("/:id", async function(req, res) {
  let categories = await getSectionDetail(connection(), req.params["id"]);
  res.json(categories);
});

router.get("/", async function(req, res) {
  let sections = await getSections(connection());
  res.json(sections);
});

router.post("/create", async function(req, res) {
  let response = {};
  try {
    response.result = await insert(connection(), req.body.name);
    response.message = {
      text: 'Section created successfully',
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
    await deleteSection(connection(), req.params["id"]);
    response.message = {
      text: 'Section deleted successfully',
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
      text: 'Section updated successfully',
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