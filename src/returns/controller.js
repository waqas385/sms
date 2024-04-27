import types from "../utils/returnTypes.js";
import { createReturn, addReturnItems, getReturns, getReturnDetail } from "./service.js";
import { updateProductQuantity } from "../products/service.js";
import { parseDateToDateTime } from "../utils/dry.js";

export async function insert(connection, req) {
  const products = req.body.products;
  const price = req.body.price;

  // Create return and add products to return_products
  const returnId = await createReturn(connection, price);
  await addReturnItems(connection, returnId, products);
  // Update product(s) quantity
  const updatedProducts = await updateProductQuantity(connection, products, true);
  if (!updatedProducts) {
    return {
      message: {
        text: 'Error occurred while creating return item',
        type: types.ERROR
      }
    }
  }

  return {
    updatedProducts,
    message: {
      text: 'Returns created successfully',
      type: types.SUCCESS
    }
  }
}

export async function list(connection, req) {
  const page = req.params["page"] || 0;
  const from = parseDateToDateTime(req.params["from"]);
  const to =  parseDateToDateTime(req.params["to"]);
  return await getReturns(connection, page, from, to);
}

export async function detail(connection, req) {
  const returnId = req.params["id"];
  return await getReturnDetail(connection, returnId);;
}