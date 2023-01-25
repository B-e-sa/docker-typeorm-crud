import defaultNote from './defaultNote';
import noteRepository from './noteRepository';

const createDefaultNote = () => {
    if (!noteRepository.findOneBy({ id: 1 })) {
        noteRepository.save(defaultNote);
    }
}

export default createDefaultNote