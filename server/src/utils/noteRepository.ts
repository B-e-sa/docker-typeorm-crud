import { Note } from '../entity/Note';
import { AppDataSource } from '../data-source';

const noteRepository = AppDataSource.getRepository(Note);

export default noteRepository;