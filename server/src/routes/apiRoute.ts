import { Router } from "express";
import noteRepository from "../utils/noteRepository";

const apiRoute = Router()

apiRoute.route('/api/notes')
    .get(async (_req, res) => {

        try {

            const allNotes = await noteRepository.find()

            res.status(200).send(allNotes)

        } catch (e) { res.status(500).send(e) }

    })
    .post(async (req, res) => {

        try {

            await noteRepository.save(req.body)

            res.sendStatus(201)

        } catch (e) { res.status(409).send(e) }

    })

apiRoute.route('/api/notes/:id')
    .delete(async (req, res) => {

        try {

            const id = Number(req.params.id)

            const noteToRemove = await noteRepository.findBy({ id: id })

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

export default apiRoute