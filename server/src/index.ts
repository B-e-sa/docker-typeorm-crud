import { AppDataSource } from "./data-source"
import createDefaultNote from "./utils/createDefaultNote"
import noteRepository from "./utils/noteRepository"
import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";

const corsOptions = {
    orgim: '/',
    optionsSuccessStatus: 200
}

const PORT = 3000

const app = express()
app.use(cors(corsOptions));
app.use(bodyParser.json())

AppDataSource.initialize()
    .then(() => {

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

        createDefaultNote()

        app.route('/api/notes')
            .get(async (_req, res) => {

                try {

                    const allNotes = await noteRepository.find()

                    res.status(200).send(allNotes)

                } catch (e) {

                    res.status(500).send(e)

                }

            })
            .post(async (req, res) => {

                try {

                    await noteRepository.save(req.body)

                    res.sendStatus(201)

                } catch (e) { res.status(409).send(e) }

            })

        app.route('/api/notes/:id')
            .delete(async (req, res) => {

                try {

                    const id = Number(req.params.id)

                    const noteToRemove =
                        await noteRepository.findBy({ id: id })

                    await noteRepository.remove(noteToRemove)

                    res.sendStatus(200)

                } catch (e) { res.status(500).send(e) }

            })
            .put(async (req, res) => {

                try {

                    const id = Number(req.params.id)

                    const [changedNote] = await noteRepository.findBy({ id: id })

                    const { field, title, content, color } = req.body

                    switch (field) {
                        case 'title':
                            changedNote.title = title
                            break;
                        case 'content':
                            changedNote.content = content
                            break
                        case 'color':
                            changedNote.color = color
                            break
                    }

                    noteRepository.save(changedNote)

                    res.sendStatus(200)

                } catch (err) { res.status(504).send(err) }
            })
    })
    .catch(e => console.error(e))

let notes = [];