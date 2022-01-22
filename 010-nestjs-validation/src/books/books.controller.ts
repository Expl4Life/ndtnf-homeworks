import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { ParseIntPipe, JoiValidationPipe } from '../pipes';
import { updateBookSchema } from './joi';

@Controller('books')
@UsePipes(ValidationPipe)
export class BooksController {

  constructor(private readonly BooksService: BooksService) {}

  @Get()
  getAll(): Promise<Book[]> {
    return this.BooksService.getAll()
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Book> {
    // FOR TEST
    // return Promise.reject();
    return this.BooksService.getById(id)
  }

  // FOR TEST ParseIntPipe
  @Get('/number/:id')
  getByNumberId(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return Promise.resolve(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.BooksService.create(createBookDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Book> {
    return this.BooksService.remove(id)
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(updateBookSchema))
  update(@Body() updateBookDto: UpdateBookDto, @Param('id') id: string): Promise<Book> {
    return this.BooksService.update(id, updateBookDto)
  }

}
