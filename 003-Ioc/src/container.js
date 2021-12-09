import { Container } from "inversify";
import { BooksRepository } from './db';
import "reflect-metadata";

const container = new Container();
container.bind(BooksRepository).toSelf()

export default container;