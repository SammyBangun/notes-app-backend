/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

const InvariantError = require("../../exceptions/InvariantError");
const { NotePayloadSchema } = require("./schema");

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
