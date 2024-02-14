const express = require("express");
const router = express.Router();
const notesController = require("../controlers/notesController");

router.route('/')
    .get(notesController.getAllNotes)
    .post(notesController.createNewNote)
    .patch(notesController.updateNotes)
    .delete(notesController.deleteNote)

module.exports = router;