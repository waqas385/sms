const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  database: 'inventory',
  dateStrings: true // to return date as from db table otherwise https://github.com/sidorares/node-mysql2/issues/262#issuecomment-241604623
};

export default dbConfig
