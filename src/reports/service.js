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