import express from 'express';

import { getAllNotes } from '../controllers/notesController.js';

const notesRoutes=express.Router();

notesRoutes.get("/get-all-notes/:courseId",getAllNotes);


export default notesRoutes;