import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import { BookItem } from '../types';

export type BookDocument = Book & Document;

@Schema()
export class Book implements BookItem {
  @Prop()
  id: string;

  @Prop({ required: true })
  title: string;
  
  @Prop()
  description: string;

  @Prop()
  authors: string;

  @Prop()
  favorite: string;

  @Prop()
  fileCover: string;

  @Prop()
  fileName: string;

  @Prop()
  fileBook: string;

}

export const ProductSchema = SchemaFactory.createForClass(Book)