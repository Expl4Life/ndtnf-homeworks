import {
  Controller,
  Get,
} from '@nestjs/common';
import { BooksService, Book } from './books.service';


@Controller('books')
export class BooksController {

  constructor(private readonly BooksService: BooksService) {}

  @Get()
  getAll(): Promise<Book[]> {
    return this.BooksService.getAll()
  }
}
