/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */

class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ClientError";
  }
}

module.exports = ClientError;
