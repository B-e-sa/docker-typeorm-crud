import Note from '../entity/Note';
import getCurrentDate from './getCurrentDate';
import noteRepository from './noteRepository';

const createDefaultNote = () => {
    if (!noteRepository.findOneBy({ id: 1 })) {

        const defaultNote = new Note;
        defaultNote.title = "First Note";
        defaultNote.content = "Hello!";
        defaultNote.date = getCurrentDate();
        defaultNote.color = "#f8f545";

        noteRepository.save(defaultNote);
        
    }
}

export default createDefaultNote