import { Router } from 'express';
import { 
  createNote, 
  getNotesByContactId, 
  getNoteById, 
  updateNote, 
  deleteNote 
} from '../controllers/noteController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /contacts/{id}/notes:
 *   post:
 *     summary: Create a new note for a contact
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               note_body:
 *                 type: string
 *               note_text:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 */
router.post('/contacts/:id/notes', createNote);

/**
 * @swagger
 * /contacts/{id}/notes:
 *   get:
 *     summary: Get all notes for a contact
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of notes
 */
router.get('/contacts/:id/notes', getNotesByContactId);

/**
 * @swagger
 * /notes/{note_id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: note_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note details
 */
router.get('/notes/:note_id', getNoteById);

/**
 * @swagger
 * /notes/{note_id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: note_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 */
router.put('/notes/:note_id', updateNote);

/**
 * @swagger
 * /notes/{note_id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: note_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 */
router.delete('/notes/:note_id', deleteNote);

export default router;