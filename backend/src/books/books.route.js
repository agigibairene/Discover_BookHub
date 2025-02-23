const express = require('express');
const Book = require('./book.model');
const router = express.Router();

// CREATE A NEW BOOK
router.post("/createBook", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// RETRIEVE ALL THE BOOKS IN THE DB
router.get("/", async (req, res) => {
    try {
        const { category, specificType } = req.query;

        let query = {}; 
        if (category && specificType) {
            query.category = category;
            query.specificType = specificType;
        }

        const books = await Book.find(query).sort({ createdAt: -1 }); 

        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Failed to fetch books" });
    }
});

// RETRIEVE BOOKS BY CATEGORY AND SPECIFICTYPE
router.get('/books', async (req, res) => {
    try {
        const { category, specificType } = req.query;
        const books = await Book.find({ category, specificType });
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// RETRIEVE A SINGLE BOOK USING ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE A BOOK BY ID
router.delete('/:id', async (req, res) => {
    try {
        console.log('Attempting to delete book with ID:', req.params.id);
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            console.log('Book not found with ID:', req.params.id);
            return res.status(404).json({ message: 'Book not found' });
        }
        console.log('Book deleted successfully:', deletedBook);
        res.json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a book to the user's session library
router.post('/add-to-library', (req, res) => {
    if (!req.session.library) {
        req.session.library = [];
    }
    req.session.library.push(req.body.book);
    res.sendStatus(200);
});

router.delete('/library/:itemId', async (req, res) => {
    try{
       
        const library = await Userlibrary.findOne({userId: req.session.userId});
        if(!library){
            return res.status(404).send("library not found");
        }
        library.items = library.items.filter(item => item.id !== req.params.itemId);
        await library.save();
        return res.sendStatus(200);
    }catch(error){
        console.error("error removing item from library", error);
        return res.status(500).send("server error");
    }
});

// Get all books in the user's session library
router.get('/library', (req, res) => {
    res.json(req.session.library || []);
});

module.exports = router;
