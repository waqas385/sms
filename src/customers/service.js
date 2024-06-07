export async function getCustomers(connection, searchText = '') {
  try {
    let whereQuery = 'status=1';
    if (searchText) {
      whereQuery += ` AND customer_name LIKE '%${searchText}%'`;
    }
    let query = `SELECT * FROM customers WHERE ${whereQuery}`;
    let [result] = await connection.query(query);
    console.log(query);
    return {
      customers: result
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCustomerDetail(connection, id) {
  try {
    let query = `SELECT * FROM customers WHERE id=${id}`;
    let [result] = await connection.query(query);
    return { customer: result[0] };
  } catch (error) {
    throw new Error(error);
  }
}

function validateCustomerData(customer) {
  const emptyField = Object.values(customer).map(val => !val).filter(Boolean);
  return emptyField.length > 0;
}

export async function insert(connection, customer) {
  if (validateCustomerData(customer)) {
    throw new Error('Please fill all * fields');
    return;
  }
  try {
    let query = 'INSERT INTO customers (`customer_name`, `phone_number`, `cnic`) VALUES ?';
    let [results] = await connection.query(query, [[[customer.customer_name, customer.phone_number, customer.cnic]]]);
    return results.insertId;
  } catch (error) {
    throw new Error(error);
  }
}

export async function update(connection, customer, customerId) {
  try {
    let query = `UPDATE customers SET customer_name='${customer.customer_name}', phone_number='${customer.phone_number}', cnic='${customer.cnic}' WHERE id=${customerId}`;
    connection.query(query);
    return '';
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteCustomer(connection, id) {
  try {
    let query = `UPDATE customers SET status=0 WHERE id=${id}`;
    connection.query(query);
    return;
  } catch (error) {
    throw new Error(error);    
  }
}