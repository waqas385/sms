export async function getSections(connection) {
  try {
    let query = `SELECT id, name FROM sections WHERE status=1`;
    let [result] = await connection.query(query);
    return {
      sections: result
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSectionDetail(connection, id) {
  try {
    let query = `SELECT * FROM sections WHERE id=${id}`;
    let [result] = await connection.query(query);
    return { section: result[0] };
  } catch (error) {
    throw new Error(error);
  }
}


export async function insert(connection, sectionName) {
  try {
    let query = 'INSERT INTO sections (`name`) VALUES ?';
    let [results] = await connection.query(query, [[[sectionName]]]);
    return results.insertId;
  } catch (error) {
    throw new Error(error);
  }
}

export async function update(connection, sectionName, categoryId) {
  try {
    let query = `UPDATE sections SET name='${sectionName}' WHERE id=${categoryId}`;
    connection.query(query);
    return '';
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteSection(connection, id) {
  try {
    let query = `UPDATE sections SET status=0 WHERE id=${id}`;
    connection.query(query);
    return;
  } catch (error) {
    throw new Error(error);    
  }
}