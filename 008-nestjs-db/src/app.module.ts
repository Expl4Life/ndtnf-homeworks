import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

const UserAtlasDB: string = process.env.DB_ATLAS_USERNAME || 'witcher';
const PasswordAtlasDB: string = process.env.DB_ATLAS_PASSWORD || '12345';
const NameAtlasDB: string = 'app_database';


@Module({
  imports: [
    BooksModule,
    MongooseModule.forRoot(
      `mongodb+srv://${UserAtlasDB}:${PasswordAtlasDB}@cluster0.ctq8h.mongodb.net/${NameAtlasDB}?retryWrites=true&w=majority`, 
      //`findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` NEED false
      { useFindAndModify: false }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
