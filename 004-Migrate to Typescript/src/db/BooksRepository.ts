import "reflect-metadata";
import { IBook } from '../types/IBook';
import { DeleteResult } from 'mongodb';
import { injectable } from "inversify";
import BookModel from '../models/Book';


@injectable()
export default class BooksRepository {

    public async createBook(book: IBook): Promise<IBook> {
        const newBook = new BookModel(book);
        await newBook.save();
        return newBook;
    }

    public getBook(id: string): Promise<IBook> {
        return BookModel.findById(id).select('-__v').exec();
    }

    public getBooks(): Promise<IBook[]> {
        return BookModel.find().exec();
    }

    public updateBook(id: string, book: IBook): Promise<IBook> {
        return BookModel.findByIdAndUpdate(id, book).exec();
    }

    public deleteBook({ id }: Pick<IBook, 'id'>): Promise<DeleteResult> {
        return BookModel.deleteOne({ _id: id }).exec();
    }
}
