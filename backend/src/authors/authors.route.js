const express = require('express');
const Authors = require('./authors.model');  
const router = express.Router();

// CREATE A NEW Author
router.post("/createAuthor", async (req, res) => {
    try {
        const { name, image, text } = req.body;
        if (!name || !image || !text) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAuthor = new Authors({ name, image, text });
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        console.error("Error creating Author:", error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// RETRIEVE ALL AUTHORS
router.get("/", async (req, res) => {
    try {
        const authors = await Authors.find().sort({ createdAt: -1 }); 
        res.status(200).json(authors);
    } catch (error) {
        console.error("Error fetching authors", error);
        res.status(500).json({ message: "Failed to fetch authors" });
    }
});

module.exports = router;
