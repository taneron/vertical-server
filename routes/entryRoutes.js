import express from 'express'
import {
  getEntrys,
  createEntry,
  updateEntry,
  deleteEntry,
  getEntry,
} from '../controllers/entryController'

const router = express.Router()

//ImageProcessor
import { uploadOne, resizeImage } from '../controllers/uploadFactory'
const resize = resizeImage('image', 'entry')

//Endpoints
router.route('/').get(getEntrys).post(uploadOne('entry'), resize, createEntry)
router
  .route('/:id')
  .get(getEntry)
  .patch(uploadOne('entry'), resize, updateEntry)
  .delete(deleteEntry)

export default router
