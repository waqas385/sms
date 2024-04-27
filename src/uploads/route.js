import express from "express";
import { get as connection } from "../dbconnection.js";
import { insertBulkMedicines } from "./service.js";
import types from "../utils/returnTypes.js";


const router = express.Router();

router.get('/save', async function(req, res) {
  try {
    const result = await insertBulkMedicines(connection());
    res.json({
      message: {
        text: 'Medicines inserted successfully',
        type: types.ERROR
      },
      result
    });
  } catch (error) {
    res.json(error);
  }
});

export default router;