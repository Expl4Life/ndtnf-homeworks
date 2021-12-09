import { IBook } from '../types/IBook';
import { Schema, model, Document } from 'mongoose';

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
export default BookModel;
