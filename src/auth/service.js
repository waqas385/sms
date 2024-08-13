import { encrypt, decrypt } from "../utils/dry.js";

export async function validateUser(username, password, connection) {
  try {
    let query = `SELECT * FROM users WHERE username='${username}'`;
    let [user] = await connection.query(query);

    if (password !== decrypt(user[0].password)) {
      throw Error('Incorrect credentials');
    }
    return user[0];
  } catch (error) {
    throw new Error(error);
  }
}
