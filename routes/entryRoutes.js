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
const resize = resizeImage('image', 'plants')

//Endpoints
router.route('/').get(getEntrys).post(uploadOne('image'), resize, createEntry)
router
  .route('/:id')
  .get(getEntry)
  .patch(uploadOne('entry'), resize, updateEntry)
  .delete(deleteEntry)

export default router
