import types from "../utils/returnTypes.js";
import { createExpanse, addExpanseItems, getExpanse, getExpanseDetail } from "./service.js";
import { updateProductQuantity } from "../products/service.js";
import { parseDateToDateTime } from "../utils/dry.js";

export async function insert(connection, req) {
  const products = req.body.products;
  const price = req.body.price;

  // Create expense and add products to purchase_products
  const returnId = await createExpanse(connection, price);
  await addExpanseItems(connection, returnId, products);
  // Update product(s) quantity
  const updatedProducts = await updateProductQuantity(connection, products, true);
  if (!updatedProducts) {
    return {
      message: {
        text: 'Error occurred while creating expense item',
        type: types.ERROR
      }
    }
  }

  return {
    updatedProducts,
    message: {
      text: 'Expense record created successfully',
      type: types.SUCCESS
    }
  }
}

export async function list(connection, req) {
  const page = req.params["page"] || 0;
  const from = parseDateToDateTime(req.params["from"]);
  const to =  parseDateToDateTime(req.params["to"]);
  return await getExpanse(connection, page, from, to);
}

export async function detail(connection, req) {
  const returnId = req.params["id"];
  return await getExpanseDetail(connection, returnId);;
}