// make bluebird default Promise
Promise = require("bluebird"); // eslint-disable-line no-global-assign
const { port, env } = require("./src/config/vars");
const logger = require("./src/config/logger");
const app = require("./src/config/express");
const mongoose = require("./src/config/mongoose");

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(port || 8080, () =>
  logger.info(`server started on port ${port} (${env})`)
);

/**
 * Exports express
 * @public
 */
module.exports = app;
