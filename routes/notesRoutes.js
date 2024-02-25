const express = require("express");
const router = express.Router();
const notesController = require("../controlers/notesController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.route('/')
    .get(notesController.getAllNotes)
    .post(notesController.createNewNote)
    .patch(notesController.updateNotes)
    .delete(notesController.deleteNote)

module.exports = router;