import {parseDateToDateTime} from "../utils/dry.js";

export async function getMinimumStockProducts(connection) {
  try {
    let query = `SELECT p.*, c.name as category, s.name as section
      FROM
        products p
      LEFT JOIN
        categories c
      ON
        p.category_id = c.id
      LEFT JOIN
        sections s
      ON
        p.section_id = s.id  
      WHERE
        p.quantity < p.min_quantity
      ORDER BY p.quantity
    `;
    let [results] = await connection.query(query);
    return results;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getExpiredProducts(connection) {
  try {
    let query = `SELECT p.*, c.name as category, s.name as section
    FROM
      products p
    LEFT JOIN
      categories c
    ON
      p.category_id = c.id
    LEFT JOIN
      sections s
    ON
      p.section_id = s.id  
    WHERE
      p.expiry_date < now()
    ORDER BY p.expiry_date`;
    let [results] = await connection.query(query);
    return results;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getNearExpiryProducts(connection) {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1 + 2; // 2 months near expiry date;
  if (month > 12) {
    month = month - 12;
    year += year;
  }

  const nearExpiryDate = parseDateToDateTime(year + '-' + month);
  try {
    let query = `SELECT p.*, c.name as category, s.name as section
    FROM
      products p
    LEFT JOIN
      categories c
    ON
      p.category_id = c.id
    LEFT JOIN
      sections s
    ON
      p.section_id = s.id  
    WHERE
      p.expiry_date < '${nearExpiryDate}'
    AND
      p.expiry_date > DATE(now())
    ORDER BY p.expiry_date`;
    let [results] = await connection.query(query);
    return results;
  } catch (error) {
    throw new Error(error);
  }
}

export async function salesReport(connection, priceType, salesFrom, salesTo, customerId) {
  let where = `WHERE o.created_date BETWEEN '${salesFrom}' AND '${salesTo}'`;
  if (priceType) {
    where += ` AND o.price_type = ${priceType}`;
  }
  if (customerId) {
    where += ` AND o.customer_id = ${customerId}`;
  }

  try {
    let query = ` SELECT o.id,
    o.price,
    o.discount,
    o.discounted_price,
    o.customer_id,
    DATE_FORMAT(o.created_date, '%d-%c-%Y %l:%i %p') AS order_creation_date,
    c.customer_name,
    c.phone_number,
    CASE
		WHEN o.price_type = 1 THEN 'Debit'
        ELSE 'Credit'
	  END as order_price_type
    FROM orders o
    LEFT JOIN customers c ON o.customer_id = c.id
    ${where}`;
    console.log(query);
    let [results] = await connection.query(query);
    return results;
  } catch (error) {
    throw new Error(error);
  }
}