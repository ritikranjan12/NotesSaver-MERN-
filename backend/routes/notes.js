const express = require('express')
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Note");
const User = require('../models/Users');
const { body, validationResult, check } = require('express-validator');
const { findByIdAndUpdate } = require('../models/Users');


// Route 1 Get all the Notes of the user /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser , async (req,res)=>{
    try {
        const notes = await Notes.find({user :req.user.id});
        
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
    
})

// Route 2 Add a new Noe notes /api/notes/addnote - Login Required
router.post('/addnote', fetchuser ,[
    body('title',"Enter a valid title").isLength({ min: 3 }),
    body('description',"Description Not be less than 5 Characters").isLength({ min: 5 })
], async (req,res)=>{
    const {title,description,tag} = req.body
    // If htere are errors , return the bad request and the errors
    const error1 = validationResult(req);
    if (!error1.isEmpty()) {
      return res.status(400).json({ errors: error1.array() });
    }
    try{
        const note = new Notes({
            title,description,tag,user :req.user.id
        })
        const savenote = await note.save();
        res.json(savenote);
    } catch(error) {
        console.log(error);
        res.status(500).send("Some error occurred");
    }

    
})

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router