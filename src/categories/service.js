
export async function getCategories(connection) {
  try {
    let query = `SELECT id, name FROM categories WHERE status=1`;
    let [result] = await connection.query(query);
    return {
      categories: result
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCategoryDetail(connection, id) {
  try {
    let query = `SELECT * FROM categories WHERE id=${id}`;
    let [result] = await connection.query(query);
    return {category: result[0]};
  } catch (error) {
    throw new Error(error);
  }
}

export async function insert(connection, categoryName) {
  try {
    let query = 'INSERT INTO categories (`name`) VALUES ?';
    let [results] = await connection.query(query, [[[categoryName]]]);
    return results.insertId;
  } catch (error) {
    throw new Error(error);
  }
}

export async function update(connection, categoryName, categoryId) {
  try {
    let query = `UPDATE categories SET name='${categoryName}' WHERE id=${categoryId}`;
    connection.query(query);
    return '';
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteCategory(connection, id) {
  try {
    let query = `UPDATE categories SET status=0 WHERE id=${id}`;
    connection.query(query);
    return '';
  } catch (error) {
    throw new Error(error);    
  }
}