import { Injectable } from '@nestjs/common';

export interface Book {
    title: string;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
      {
        title: 'Harry Potter'
      }
  ]
  async getAll(): Promise<Book[]> {
    return Promise.resolve(this.books);
  }
}