import express from 'express'
import {
  getPlants,
  createPlant,
  updatePlant,
  deletePlant,
  getPlant,
} from '../controllers/plantController'

const router = express.Router()

router.route('/').get(getPlants).post(createPlant)
router.route('/:id').get(getPlant).delete(deletePlant)

export default router
