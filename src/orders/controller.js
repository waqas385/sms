import types from "../utils/returnTypes.js";
import { createOrder, addItemsToOrder, getOrders, getOrderDetail } from "./service.js";
import { updateProductQuantity } from "../products/service.js";
import { parseDateToDateTime } from "../utils/dry.js";

export async function insert(connection, req) {
  const products = req.body.products;
  const price = req.body.price;
  const discount = req.body.discount;
  const discounted_price = req.body.discounted_price;
  const customer_id = req.body.customer_id;
  const price_type = req.body.price_type;

  // Create order and add products to order
  const orderId = await createOrder(connection, price, discount, discounted_price, customer_id, price_type);
  await addItemsToOrder(connection, orderId, products);
  // Update product(s) quantity
  const updatedProducts = await updateProductQuantity(connection, products);
  if (!updatedProducts) {
    return {
      message: {
        text: 'Error occurred while creating order',
        type: types.ERROR
      }
    }
  }

  return {
    updatedProducts,
    message: {
      text: 'Order created successfully',
      type: types.SUCCESS
    }
  }
}

export async function list(connection, req) {
  const page = req.params["page"] || 0;
  const from = parseDateToDateTime(req.params["from"]);
  const to =  parseDateToDateTime(req.params["to"]);
  return await getOrders(connection, page, from, to);
}

export async function detail(connection, req) {
  const orderId = req.params["id"];
  return await getOrderDetail(connection, orderId);;
}