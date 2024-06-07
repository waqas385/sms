import { getCurrentDateTime } from "../utils/dry.js";

const pageCount = 20;

/**
 * 
 * @param {*} connection 
 * @param {*} orderId 
 * @param {*} products array of product {productId, quantity}
 */
export async function addItemsToOrder(connection, orderId, products) {
  let orderTableData = [];
  products.forEach(product => {
    orderTableData.push([product.productId, product.quantity, orderId, product.new_price]);
  });

  try {
    let query = `INSERT INTO order_products (product_id, quantity, order_id, price) VALUES ?`;
    console.log(query, [orderTableData]);
    await connection.query(query, [
      orderTableData,
    ]);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 
 * @param {*} connection 
 * @param {*} products array of product {productId, quantity}
 * @returns 
 */
export async function createOrder(connection, price, discount, discounted_price, customer_id, price_type) {
  const createdDate = getCurrentDateTime();
  let query = `INSERT INTO orders (created_date, price, discount, discounted_price, customer_id, price_type) VALUES ('${createdDate}',${price},${discount},${discounted_price}, ${customer_id}, ${price_type})`;
  try {
    console.log(query);
    let [results] = await connection.query(query);
    return results.insertId;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 
 * @param {*} connection 
 * @returns pending orders with status = 0 
 */
export async function getPendingOrders(connection) {
  try {
    let query = `SELECT * FROM orders WHERE status=1`;
    let [results] = await connection.quantity(query);
    return results;
  } catch (error) {
    throw new Error(error);
  }
}


async function getOrdersTotalCount(connection, from, to) {
  let whereQuery = `WHERE created_date BETWEEN '${from}' AND '${to}'`;
  let totalCountQuery =
    "SELECT count(id) as totalCount FROM orders "+whereQuery;
  console.log(totalCountQuery);
  let [results] = await connection.query(totalCountQuery);
  return results;
}

/**
 * 
 * @param {*} connection DB connection
 * @param {*} page page number
 * @returns Arrary of orders
 */
export async function getOrders(connection, page, from, to) {
  const offset = page * pageCount;
  let limitOffsetQuery = "LIMIT " + pageCount + " OFFSET " + offset;
  let whereQuery = `WHERE o.created_date BETWEEN '${from}' AND '${to}'`;

  try {
    let query = `
    SELECT o.*, DATE_FORMAT(created_date, '%d-%c-%Y %l:%i %p') as creation_date, c.customer_name, c.phone_number
    FROM inventory.orders o
    LEFT JOIN inventory.customers c
    ON o.customer_id = c.id
    ${whereQuery}
    order by id desc
    ${limitOffsetQuery}
    `;
    console.log(query);
    const [orders] = await connection.query(query);
    const totalCount = await getOrdersTotalCount(connection, from, to);
    return {
      orders,
      totalCount
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getOrderDetail(connection, orderId) {
  try {
    let query = `
    SELECT p.name, op.quantity, op.price, s.name as section, c.name as category
    FROM order_products op
    LEFT JOIN products p
    ON op.product_id = p.id
    LEFT JOIN sections s
    ON p.section_id = s.id
    LEFT JOIN categories c
    ON p.category_id = c.id
    WHERE op.order_id=${orderId}
    `;
    let [results] = await connection.query(query);
    return {
      items:results
    };
  } catch (error) {
    throw new Error(error);
  }
}