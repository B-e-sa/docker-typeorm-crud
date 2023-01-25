import { Router } from 'express';
import { changeNote, createNewNote, getAllNotes, removeNote } from '../controllers/apiController';

const apiRoute = Router();

apiRoute.route('/api/notes')
    .get(getAllNotes)
    .post(createNewNote);

apiRoute.route('/api/notes/:id')
    .delete(removeNote)
    .put(changeNote);

export default apiRoute;