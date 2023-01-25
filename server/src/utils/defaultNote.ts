import { Note } from './../entity/Note';
import getCurrentDate from './getCurrentDate';

const defaultNote = new Note;

defaultNote.title = "First Note";
defaultNote.content = "Hello!";
defaultNote.date = getCurrentDate();
defaultNote.color = "#f8f545";

export default defaultNote;