import crypto from 'node:crypto';

const algorithm = 'aes-256-cbc'; //Using AES encryption

export function encrypt(text) {
  const key = Buffer.from(process.env.DECRYPT_KEY, 'hex');
  const iv = Buffer.from(process.env.DECRYPT_IV, 'hex');

  let cipher = crypto.createCipheriv(algorithm, key, iv); // crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

export function decrypt(text) {
  const key = Buffer.from(process.env.DECRYPT_KEY, 'hex');
  const iv = Buffer.from(process.env.DECRYPT_IV, 'hex');

  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, key, iv);//crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Date relevant functions
function prefixZeroIfNeeded(n) {
  return String(n).padStart(2, 0);
}

export function parseDateToDateTime(dateString) {
  const date = new Date(dateString);

  const { year, month, monthDate } = getCurrentDate(date);
  const hours = prefixZeroIfNeeded(date.getHours());
  const minutes = prefixZeroIfNeeded(date.getMinutes());
  const seconds = prefixZeroIfNeeded(date.getSeconds());

  return `${year}-${month}-${monthDate} ${hours}:${minutes}:${seconds}`;
}

function getCurrentDate(dateObject) {
  const date = dateObject ? dateObject : new Date();
  const year = date.getFullYear();
  const month = prefixZeroIfNeeded(date.getMonth() + 1);
  const monthDate = prefixZeroIfNeeded(date.getDate());
  return {
    year,
    month,
    monthDate,
  };
}

export function getCurrentDateWithMilliseconds() {
  const date = new Date();
  const { year, month, monthDate } = getCurrentDate();
  const miliSeconds = date.getMilliseconds();

  return `${year}${month}${monthDate}_${miliSeconds}`;
}

export function getCurrentDateTime() {
  const date = new Date();
  const { year, month, monthDate } = getCurrentDate();
  const hours = prefixZeroIfNeeded(date.getHours());
  const minutes = prefixZeroIfNeeded(date.getMinutes());
  const seconds = prefixZeroIfNeeded(date.getSeconds());

  return `${year}-${month}-${monthDate} ${hours}:${minutes}:${seconds}`;
}
// Date relevant functions ENDS

export function prepareInsertQueryData(data, columns) {
  let columnsData = {};
  columns.forEach((column) => {
    columnsData[column] = data[column];
  });
  return columnsData;
}

export function anyFieldEmpty(form) {
  let invalidFields = Object.values(form)
    .map((val) => !val)
    .filter(Boolean);
  return invalidFields.length > 0;
}
