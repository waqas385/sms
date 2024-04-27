import readXlsxFile from "read-excel-file/node";

/**
 * @param {*} connection 
 * @returns object of categories name & id
 */
async function getCategories(connection) {
  try {
    let query = 'SELECT * FROM categories';
    let [results] = await connection.query(query);
    let categories = {};

    results.forEach(row => {
      categories[String(row.name).toLowerCase()] = row.id;
    });

    return categories;
  } catch (error) {
    throw Error(error);
  }
}

export async function insertBulkMedicines(connection) {
  // Uses absolute path
  const filePath = './public/uploads/ProductsInventory.xlsx';
  const categories = await getCategories(connection);
  
  try {
    let rows = await readXlsxFile(filePath);
    rows.splice(0, 1); // Remove header row
    let insertRows = rows.map(row => {
      row = row.filter(cell => cell != null); // remove NULL
      let category = row[0].toLowerCase();
      row[0] = categories[category];
      row.push(1); // Added for section_id
      return row;
    });
    const productsColumn = [
      'category_id',
      'name',
      'price',
      'quantity',
      'min_quantity',
      'section_id'
    ];

    // Help taken for MySQL Transaction
    // https://www.mysqltutorial.org/mysql-stored-procedure/mysql-transactions/
    // https://dev.mysql.com/doc/refman/8.0/en/commit.html

    // Create insert query
    let insertQuery = `INSERT INTO products (${productsColumn}) VALUES ?`;
    let [results] = await connection.query(insertQuery, [insertRows]);
    return results;
  } catch (error) {
    throw Error(error);
  }
}