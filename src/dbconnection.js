import mysql from 'mysql2'
import dbConfig from './db.config.js'

let connection = '';

export function get() {
  if (!connection) {
    console.log('connection established');
    connection = mysql.createPool(dbConfig).promise();  
  }
  return connection;
}

export function end() {
  if (!connection) {
    console.log('connection is ended');
    connection.end();
    connection = '';
  }
  console.log('No connection found');
}