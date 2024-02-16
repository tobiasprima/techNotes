const Notes = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

//GET /notes
const getAllNotes = asyncHandler(async (req,res) => {
    const notes = await Notes.find().lean();
    if(!notes?.length){
        res.status(400).json({message: 'No notes found.'});
    }

    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec();
        return {...note, username: user.username};
    }))

    res.json(notesWithUser);
})

//POST /notes
const createNewNote = asyncHandler(async (req,res)=> {
    const { user, title, text } = req.body;
    if (!user || !title || !text ){
        return res.status(400).json({message: 'All fields are required'});
    }

    const duplicate = await Notes.findOne({title}).lean().exec();

    if(duplicate){
        return res.status(400).json({mesasge: 'Duplicate Notes Title'});
    }

    const newNote = await Notes.create({user, title, text});
    if(newNote){
        res.status(201).json({message: `New Note created.`});
    } else {
        res.status(404).json({message: 'Invalid data received.'});
    }
})

//PATCH /notes
const updateNotes = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;

    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(404).json({message: 'All fields are required.'});
    }

    const note = await Notes.findById(id).exec();

    if(!note){
        return res.status(404).json({message: 'Note not found.'});
    }

    const duplicate = await Notes.findOne({title}).lean().exec();
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate Notes Title'});
    }

    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updatedNote = await note.save();
    
    res.json({message: `${updatedNote.title} updated.`});
})

//DELETE /notes
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if(!id){
        return res.status(400).json({message: 'Notes ID required'});
    }

    const note = await Notes.findById(id).exec();

    if(!note){
        return res.status(400).json({message: 'Note not found'});
    }

    const result = await note.deleteOne();

    res.json({message: `Notes ${result.title} with ID ${result.id} deleted.`});
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNotes,
    deleteNote
}