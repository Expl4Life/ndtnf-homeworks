import BooksRepository from "db/BooksRepository";

const booksDB: BooksRepository = new BooksRepository();

console.log('%cindex.ts line:5 booksDB', 'color: #007acc;', booksDB);