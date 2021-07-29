import Plant from '../models/plantModel'
import { getAll, getOne, updateOne, deleteOne, createOne } from './handlerFactory'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'

export const getPlants = getAll(Plant)
export const getPlant = getOne(Plant)
export const updatePlant = updateOne(Plant)
export const deletePlant = deleteOne(Plant)
export const createPlant = createOne(Plant)
