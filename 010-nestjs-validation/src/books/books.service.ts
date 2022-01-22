import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async getAll(): Promise<Book[]> {
    return this.bookModel.find().exec()
  }

  async getById(id: string): Promise<Book> {
    return this.bookModel.findById(id)
  }

  async create(productDto: CreateBookDto): Promise<Book> {
    const newProduct = new this.bookModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<Book> {
    return this.bookModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateBookDto): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}