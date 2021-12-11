import { Container } from "inversify";
import { BooksRepository } from './db';

const container: Container = new Container();
container.bind(BooksRepository).toSelf()

export default container;