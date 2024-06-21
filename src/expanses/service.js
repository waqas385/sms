import { getCurrentDateTime } from "../utils/dry.js";

const pageCount = 150;

/**
 * 
 * @param {*} connection 
 * @param {*} returnId 
 * @param {*} products array of product {productId, quantity}
 */
export async function addExpanseItems(connection, returnId, products) {
  let returnTableData = [];
  products.forEach(product => {
    returnTableData.push([product.productId, product.quantity, returnId, product.new_price]);
  });

  try {
    let query = `INSERT INTO purchase_products (product_id, quantity, return_id, price) VALUES ?`;
    console.log(query, [returnTableData]);
    await connection.query(query, [
      returnTableData,
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
export async function createExpanse(connection, price) {
  const createdDate = getCurrentDateTime();
  let query = `INSERT INTO expanses (created_date, price) VALUES ('${createdDate}',${price})`;
  try {
    console.log(query);
    let [results] = await connection.query(query);
    return results.insertId;
  } catch (error) {
    throw new Error(error);
  }
}

async function getExpanseTotalCount(connection, from, to) {
  let whereQuery = `WHERE created_date BETWEEN '${from}' AND '${to}'`;
  let totalCountQuery =
    "SELECT count(id) as totalCount FROM expanses "+whereQuery;
  console.log(totalCountQuery);
  let [results] = await connection.query(totalCountQuery);
  return results;
}

/**
 * 
 * @param {*} connection DB connection
 * @param {*} page page number
 * @returns Arrary of expanses
 */
export async function getExpanse(connection, page, from, to) {
  const offset = page * pageCount;
  let limitOffsetQuery = "LIMIT " + pageCount + " OFFSET " + offset;
  let whereQuery = `WHERE created_date BETWEEN '${from}' AND '${to}'`;

  try {
    let query = `SELECT *, DATE_FORMAT(created_date, '%d-%c-%Y %l:%i %p') as creation_date FROM expanses ${whereQuery} order by id desc ${limitOffsetQuery}`;
    console.log(query);
    const [expanses] = await connection.query(query);
    const totalCount = await getExpanseTotalCount(connection, from, to);
    return {
      expanses,
      totalCount
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getExpanseDetail(connection, returnId) {
  try {
    let query = `
    SELECT p.name, pp.quantity, pp.price, s.name as section, c.name as category
    FROM purchase_products pp
    LEFT JOIN products p
    ON pp.product_id = p.id
    LEFT JOIN sections s
    ON p.section_id = s.id
    LEFT JOIN categories c
    ON p.category_id = c.id
    WHERE pp.return_id=${returnId}
    `;
    let [results] = await connection.query(query);
    return {
      items:results
    };
  } catch (error) {
    throw new Error(error);
  }
}