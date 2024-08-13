# Project Todo's

## 23 May 24
1. Create reports for debit sales (daily & monthly)
2. Create reports for credit sales (daily & monthly)

/home/waqasah1/beinventory


mv /home/waqasah1/public_html/beinventory.waqasahmed.pk/* /home/waqasah1/beinventory

```
const dbConfig = {
  host: 'localhost',
  user: 'waqasah1_pmsuser',
  password: '1a7x?keyrz4^',
  database: 'waqasah1_pms',
//   debug: true,
  dateStrings: true // to return date as from db table otherwise https://github.com/sidorares/node-mysql2/issues/262#issuecomment-241604$
};

export default dbConfig

```

Users table SQL
```
CREATE TABLE `inventory`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `username` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `roles` ENUM('admin', 'user', 'test') DEFAULT 'user',
  `shop` VARCHAR(255) NULL,
  `address` VARCHAR(255) NULL,
  `address1` VARCHAR(255) NULL,
  `logo` VARCHAR(255) NULL,
  `phone_number` VARCHAR(20) NULL,
  `parent_id` INT NULL DEFAULT NULL,
  `created_date` DATETIME NULL,
  `updated_date` DATETIME NULL,
  `deleted_date` DATETIME NULL,
  PRIMARY KEY (`id`));

```

eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDY0LCJ0eXBlIjoidXNlciIsImlhdCI6MTcyMjM0OTk1NiwiZXhwIjoxNzIyOTQ5OTU2LCJhdWQiOiJiYWNrZW5kY29kZS5oYWxsYS5zYSIsImlzcyI6IjI3Y2FmNTJjLWYxYTMtNGE5ZC04OTQyLWJiMTMzNjAzOTlmNCIsInN1YiI6IndhcWFzMzg1QGdtYWlsLmNvbSJ9.Wq4-RQTY_C2xrVSEs0WvUF-JMibZ1aFFyOsOVddapFAZ6HxTMNDT9Vp8920JGocBu1zUcNMr9jktARNVlRBPp4i2Q6fo-SraAetu4Yhaq1BYb-orAS3Ng6OwPnupp_qDG2p1rgAAykAPRnHPCvRHM-rqkLmIleJpJudAw1SMaC4dwmbjHqqQ-VlKki0HAjM5XutH-UdMHuR4qCMgrpqiWjeR1GJoRZISe2f81ME07hnvZpww22oDQMYJHO6nbuZqI4cpVM_jYms5cZgnac1DHbdtObhssP6UQAokGX9LEF_DLRgrfHSeZvMDn505-_G_IRj2nO_yLuDvvh3sxfvjmA

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wOC0wOVQxMDozNDowNi41OTdaIiwidXNlciI6MSwibmFtZSI6IldhcWFzIiwiZW1haWwiOiJhYmNAZ21haWwuY29tIiwiaWF0IjoxNzIzMTk5NjQ2fQ.urf7FZxCP_siMSlOC3XZUEOFR7dBcY6VeF6Alan9WGo

<https://www.tutorialspoint.com/encrypt-and-decrypt-data-in-nodejs>
<https://nodejs.org/api/crypto.html>