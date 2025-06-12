/* eslint-disable linebreak-style */
/* eslint-disable quotes */

require("dotenv").config();

const Hapi = require("@hapi/hapi");
const notes = require("./api/notes");
const NotesService = require("./services/postgres/NotesService");
const NotesValidator = require("./validator/notes");
const ClientError = require("./exceptions/ClientError");

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
