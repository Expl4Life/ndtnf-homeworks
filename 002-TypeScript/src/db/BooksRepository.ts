import { IBook } from '../types/IBook';
import { Schema, model, Document } from 'mongoose';
import { DeleteResult } from 'mongodb';

const bookSchema = new Schema<Document & IBook>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favorite: {
        type: String,
        default: "",
    },
    fileCover: {
        type: String,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    },
    fileBook: {
        type: String,
        default: "",
    },
});

const BookModel = model<Document & IBook>('Book', bookSchema);

export default class BooksRepository {

    public createBook(book: IBook): IBook {
        return book;
    }

    public getBook({ id }: Pick<IBook, 'id'>): Promise<IBook> {
        return BookModel.findById(id).exec();
    }

    public getBooks(): Promise<IBook[]> {
        return BookModel.find().exec();
    }

    public updateBook({ id, ...bookInfo }: IBook): Promise<IBook> {
        return BookModel.findByIdAndUpdate(id, bookInfo, { new: true })
            .then((res) => {
                if (res === null) {
                    return Promise.reject(new Error('Code: 404'));
                }
                // eslint-disable-next-line no-underscore-dangle
                return res;
            });
    }

    public deleteBook({ id }: Pick<IBook, 'id'>): Promise<DeleteResult> {
        return BookModel.deleteOne({ _id: id }).exec();
    }
}
