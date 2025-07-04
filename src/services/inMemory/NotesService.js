/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
// eslint-disable-next-line quotes

const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class NotesService {
  constructor() {
    this._note = [];
  }

  addNote({ title, tags, body }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    this._note.push(newNote);
    const isSuccess = this._note.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError("Catatan gagal ditambahkan");
    }

    return id;
  }

  getNotes() {
    return this._note;
  }

  getNoteById(id) {
    const note = this._note.filter((n) => n.id === id)[0];
    if (!note) {
      throw new NotFoundError("Catatan tidak ditemukan");
    }
    return note;
  }

  editNoteById(id, { title, tags, body }) {
    const index = this._note.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError("Gagal memperbarui catatan. Id tidak ditemukan");
    }

    const updatedAt = new Date().toISOString();

    this._note[index] = {
      ...this._note[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this._note.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError("Catatan gagal dihapus. Id tidak ditemukan");
    }

    this._note.splice(index, 1);
  }
}

module.exports = NotesService;
