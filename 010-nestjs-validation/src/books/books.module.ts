import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book, ProductSchema } from './schemas/book.schema';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    MongooseModule.forFeature([
      {name: Book.name, schema: ProductSchema}
    ])
  ]
})
export class BooksModule {
}