import BooksRepository from '../../db/BooksRepository';
import container from '../../container';
import express from 'express';
import { Book } from '../../models';
import { errorCreator } from '../../utils';

const router = express.Router();

//BOOKS API

// GET
router.get('/', async (req, res) => {
    const repo = container.get(BooksRepository);
    const books = await repo.getBooks();
    res.json(books);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const repo = container.get(BooksRepository);

    try {
        const book = await repo.getBook(id);
        res.json(book);
    } catch (e) {
        res.status(404);
        res.json(errorCreator(404));
    }
});

// POST
router.post('/', async (req, res) => {
    const repo = container.get(BooksRepository);
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook,
    } = req.body;

    try {
        const newBook = await repo.createBook({
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        })
        
        res.status(201);
        res.json(newBook);
    } catch (e) {
        console.error(e);
        res.json(errorCreator(500));
    }
});

// PUT
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const repo = container.get(BooksRepository);
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    } = req.body;

    try {
        const book = await repo.updateBook(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        });
        res.json(book);
    } catch (e) {
        console.error(e);
        res.json(errorCreator(500));
    }
});


// DELETE
router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
        res.json(true);
    } catch (e) {
        console.error(e);
        res.json(errorCreator(500));
    }
});

module.exports = router;
