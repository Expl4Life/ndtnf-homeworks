import BooksRepository from '../../db/BooksRepository';
import container from '../../container';
import express, {Request, Response} from 'express';
import { errorCreator } from '../../utils';
import { IBook } from '../../types/IBook';

const router = express.Router();

//BOOKS API
// GET
router.get('/', async (req: Request, res: Response) => {
    const repo: BooksRepository = container.get(BooksRepository);
    const books = await repo.getBooks();
    res.json(books);
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const repo: BooksRepository = container.get(BooksRepository);

    try {
        const book = await repo.getBook(id);
        res.json(book);
    } catch (e) {
        res.status(404);
        res.json(errorCreator(404));
    }
});

// POST
router.post('/', async (req: Request, res: Response) => {
    const repo: BooksRepository = container.get(BooksRepository);
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
        } as IBook)
        
        res.status(201);
        res.json(newBook);
    } catch (e) {
        console.error(e);
        res.json(errorCreator(500));
    }
});

// PUT
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const repo: BooksRepository = container.get(BooksRepository);
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
        } as IBook);
        res.json(book);
    } catch (e) {
        console.error(e);
        res.json(errorCreator(500));
    }
});


// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;

    const repo: BooksRepository = container.get(BooksRepository);

    try {
        await repo.deleteBook(id);
        res.json(true);
    } catch (e) {
        console.error(e);
        res.json(errorCreator(500));
    }
});

export default router
