const express = require('express')
const router = express.Router();
const Notes = require('../models/Notes');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const { findByIdAndUpdate } = require('../models/User');
//get all the notes 
router.get('/getallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//add notes through http://127.0.0.1:5000/api/notes/addnote ,no login required
router.post('/addnote', fetchuser, [body('content').isLength({ min: 5 })], async (req, res) => {

    try {
        const { title, content, tags } = req.body;

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const note = new Notes({
            title, content, tags, user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote)


    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }


})

//ROUTER NO 3 :update note through http://127.0.0.1:5000/api/notes/updatenote:id ,no login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    //using destructuring to get the data to be updated
    const { title, content, tags } = req.body;
    try {
        //creating newnote object and adding data to that object
        let newNote = {};
        if (title) { newNote.title = title };
        if (content) { newNote.content = content };
        if (tags) { newNote.tags = tags };

        //note konsi update karni hai ye find karnA
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not found") }

        //check if note to be updated belongs to a particular user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//ROUTER NO 4 :update note through http://127.0.0.1:5000/api/notes/deletenote:id , no login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    //using destructuring to get the data to be updated
   // const { title, content, tags } = req.body;
    try {
        //note konsi delete karni hai ye find karnA
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not found") }

        //check if note to be deleted belongs to a particular user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been Deleted", note: note });
    }
    catch (error) {
        console.error(error.message);
        //res.status(500).send("Some error occured");
    }
})
module.exports = router