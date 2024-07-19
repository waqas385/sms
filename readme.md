# Inventory

## DB Connection

```

const dbConfig = {
  host: 'localhost',
  user: 'waqasah1_test',
  password: '1a7x?keyrz4^',
  database: 'waqasah1_inventory',
  dateStrings: true // to return date as from db table otherwise https://github.com/sidorares/node-mysql2/issues/262#issuecomment-241604$
};
```

## Problem faced while deployment

### Facing issue when uploaded project content to server
```
Error [ERR_REQUIRE_ESM]: require() of ES Module /home/waqasah1/beinventory/app.js from /opt/cpanel/ea-ruby27/root/usr/share/passenger/helper-scripts/node-loader.js not supported.
```


```
app.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which declares all .js files in that package scope as ES modules.
App 1074883 output: Instead either rename app.js to end in .cjs, change the requiring code to use dynamic import() which is available inall CommonJS modules, or change "type": "module" to "type": "commonjs" in /home/waqasah1/public_html/beinventory.waqasahmed.pk/package.json to treat all .js files as CommonJS (using .mjs for all ES modules instead).

```

Resolved problem by following:

### Vue.js + Vite when page refresh 404 page shown

Add following to `.htaccess`

<https://stackoverflow.com/questions/36399319/vue-router-return-404-when-revisit-to-the-url>

```
<ifModule mod_rewrite.c>
    RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</ifModule>
```