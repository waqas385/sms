import {prepareInsertQueryData, parseDateToDateTime} from "../utils/dry.js";

const pageCount = 20;

async function getProductsTotalCount(connection, searchText) {
  let whereQuery = 'WHERE status=1';

  if (searchText) {
    whereQuery += ` AND name like '%${searchText}%'`;
  }

  let totalCountQuery =
    "SELECT count(id) as totalCount FROM products " + whereQuery;
  console.log(totalCountQuery);
  let [results] = await connection.query(totalCountQuery);
  return results;
}

/**
 * 
 * @param {*} connection DB connection
 * @param {*} searchText search text
 * @param {*} page page number
 * @returns Arrary of products {name, id, ...}
 */
export async function get(connection, searchText, page) {
  const offset = page * pageCount;
  let limitOffsetQuery = "LIMIT " + pageCount + " OFFSET " + offset;
  let whereQuery = 'WHERE p.status=1';

  if (searchText) {
    whereQuery += ` AND p.name like '%${searchText}%'`;
  }

  try {
    let query = `SELECT p.*, DATE(p.expiry_date) as expiry, c.name as category, s.name as section
    FROM products p
    LEFT JOIN categories c
    ON p.category_id = c.id
    LEFT JOIN sections s
    ON p.section_id = s.id
    ${whereQuery} ${limitOffsetQuery}`;
    console.log(query);
    const [products] = await connection.query(query);
    const totalCount = await getProductsTotalCount(connection, searchText);

    return {
      products,
      totalCount
    }
  } catch (error) {
    throw new Error(error);
    return '';
  }
}

/**
 * 
 * @param {*} connection DB connection
 * @param {*} products array of product {productId, quantity}
 * @param {*} increment boolean
 */
export async function updateProductQuantity(connection, products, increment) {
  let setQuery = '';
  products.forEach(product => {
    setQuery += 'quantity = quantity' + (increment ? ' + ': ' - ') + product.quantity + ', ';
  });
  setQuery = setQuery.substring(0, setQuery.lastIndexOf(','));

  let productIds = products.map(product => product.productId).join(',');
  try {
    let query = `UPDATE products SET ${setQuery} WHERE id in (${productIds})`;
    console.log(query);
    let [results] = await connection.query(query);
    return results;
  } catch (error) {
    throw new Error(error);
    return '';
  }
}

function getProductTableData(formData) {
  const productTableColumns = [
    'name',
    'description',
    'expiry_date',
    'quantity',
    'min_quantity',
    'section_id',
    'category_id',
    'sku',
    'price'
  ];
  const productTableData = prepareInsertQueryData(formData, productTableColumns);
  productTableData['expiry_date'] = parseDateToDateTime(productTableData['expiry_date']);

  return {
    columns: productTableColumns,
    data: productTableData
  };
}

export async function create(connection, formData) {
  const productTableData = getProductTableData(formData);

  try {
    let query = `INSERT into products (${productTableData.columns.join(',')}) VALUES ?`;
    let [results] = await connection.query(query, [[Object.values(productTableData.data)]]);
    return results.insertId;
  } catch (error) {
    throw new Error(error);
    return '';
  }
}

export async function save(connection, formData) {
  const productTableData = getProductTableData(formData).data;
  const productId = formData['id'];
  
  let setQuery = '';
  Object.keys(productTableData).forEach(fieldKey => {
    if (typeof productTableData[fieldKey] === 'string') {
      setQuery += `${fieldKey}='${productTableData[fieldKey]}',`;
    } else if (typeof productTableData[fieldKey] === 'number') {
      setQuery += `${fieldKey}=${productTableData[fieldKey]},`;
    }
  });
  setQuery = setQuery.substring(0, setQuery.lastIndexOf(','));
  
  try {
    let query = `UPDATE products SET ${setQuery} WHERE id=${productId}`;
    let [results] = await connection.query(query);
    return results;
  } catch (error) {
    throw new Error(error);
    return '';
  }
}

export async function deleteSingleProduct(connection, productId) {
  try {
    let query = `UPDATE products SET status=0 WHERE id=${productId}`;
    let [result] = await connection.query(query);
    return result;
  } catch (error) {
    throw new Error(error);
    return '';
  }
}

export async function getProductDetail(connection, productId) {
  try {
    let query = `SELECT *, DATE(expiry_date) as expiry FROM products WHERE status=1 AND id=${productId}`;
    let [result] = await connection.query(query);
    result[0].expiry_date = result[0].expiry;
    return result[0];
  } catch (error) {
    throw new Error(error);
    return '';
  }
}

export async function searchProductByName(connection, name) {
  try {
    let query = `SELECT *, DATE(expiry_date) as expiry FROM products WHERE status=1 AND name like '${name}%' `;
    let [result] = await connection.query(query);
    return {
      count: result.length,
      products: result
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function searchProduct(connection, name) {
  try {
    let query = `SELECT p.*, c.name as category, s.name as section
    FROM products p
    LEFT JOIN categories c
    ON p.category_id = c.id
    LEFT JOIN sections s
    ON p.section_id = s.id
    WHERE p.status=1
    AND p.expiry_date > DATE(now())
    AND p.name LIKE '%${name}%'`;
    let [result] = await connection.query(query);
    console.log('SEARCH:', query);

    return {
      count: result.length,
      products: result
    };
  } catch (error) {
    throw new Error(error);
    return '';
  }
}