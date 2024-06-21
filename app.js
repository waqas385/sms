import http from 'http';
import createError from "http-errors";
import express from "express";
import path from "path";
import cors from "cors";
import fileUpload from "express-fileupload";
import logger from "morgan";
import { URL } from "url";
import appConfig from "./app.config.js";

const __dirname = new URL(".", import.meta.url).pathname;

import productsRouter from "./src/products/route.js";
import orderRouter from "./src/orders/route.js";
import categoriesRouter from "./src/categories/route.js";
import sectionsRouter from "./src/sections/route.js";
import reportsRouter from "./src/reports/route.js";
import uploadRouter from "./src/uploads/route.js";
import returnsRouter from "./src/returns/route.js";
import customerRouter from "./src/customers/route.js";
import expansesRouter from "./src/expanses/route.js";

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

// App tester
app.get(appConfig.baseURI, (req, res) => {
  res.json({
    message: 'App successfully started'
  })
});

app.use(appConfig.baseURI+'uploads', uploadRouter);
app.use(appConfig.baseURI+'products', productsRouter);
app.use(appConfig.baseURI+'orders', orderRouter);
app.use(appConfig.baseURI+'categories', categoriesRouter);
app.use(appConfig.baseURI+'sections', sectionsRouter);
app.use(appConfig.baseURI+'reports', reportsRouter);
app.use(appConfig.baseURI+'returns', returnsRouter);
app.use(appConfig.baseURI+'customers', customerRouter);
app.use(appConfig.baseURI+'expanses', expansesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

const port = 3000; // 3000 port

// export default app;

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

