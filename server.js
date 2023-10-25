const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3000;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //

app.post('/create', async (req, res) =>{
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({error: 'Error creating the book'});
    }
});

// insertMany
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;

    let dbResponse =  await  Book.insertMany(books);
    res.send(dbResponse);
})

app.put('/findOneAndReplace/:id', (req, res)=> {
    try {
        const replaceBook = Book.findOneAndReplace({_id: req.params.id}, req.body);
        res.json(replaceBook);
    } catch (error) {
        res.status(500).json({error: 'Error replacing the book'})
    }
})



app.put('/findOneAndUpdate/:id', async (req, res)=>{
    try {
        const updatedBook = await Book.findOneAndUpdate({_id: req.params.id}, req.body);
        res.json(updatedBook);
    } catch (error){
        res.status(500).json({error: "Error updating the book"})
    }
})

app.get('/find', (req, res)=>{
    try {
        const books = Book.find(req.query);
        res.json(books);
    } catch (error) {
        res.status(500).json({error: 'Error finding books'});
    }
})

 app.get('/findById/:id', (req, res)=>{
    try {
        const book = Book.findById(req.params.id);
        res.json(book)
    } catch (error) {
        res.status(500).json({error: 'Error finding the book'})
    }
 })
// 

// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


