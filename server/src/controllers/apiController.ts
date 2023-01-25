import Note from "../entity/Note";
import getCurrentDate from "../utils/getCurrentDate";
import noteRepository from "../utils/noteRepository";

const getAllNotes = async (_req, res) => {

    try {

        const allNotes = await noteRepository.find();

        res.status(200).send(allNotes);

    } catch (e) { res.status(500).send(e) };

};

const createNewNote = async (_req, res) => {

    try {

        const newNote = new Note;
        newNote.title = 'Title'
        newNote.content = 'Hello!'
        newNote.date = getCurrentDate()
        newNote.color = "#f8f545"

        await noteRepository.save(newNote);

        res.sendStatus(201);

    } catch (e) { res.status(409).send(e) };

};

const removeNote = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const noteToRemove =
            await noteRepository.findBy({ id: id });

        await noteRepository.remove(noteToRemove);

        res.sendStatus(200);

    } catch (e) { res.status(500).send(e) };

};

const changeNote = async (req, res) => {
    try {

        const id = Number(req.params.id);

        const [changedNote] =
            await noteRepository.findBy({ id: id });

        const { field, title, content, color } = req.body;

        switch (field) {
            case 'title':
                changedNote.title = title;
                break;
            case 'content':
                changedNote.content = content;
                break;
            case 'color':
                changedNote.color = color;
                break;
        };

        noteRepository.save(changedNote);

        res.sendStatus(200);

    } catch (err) { res.status(504).send(err) };
};

export {
    changeNote,
    createNewNote,
    getAllNotes,
    removeNote,
};
