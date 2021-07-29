import Plant from '../models/plantModel.js'
import { getAll, getOne, updateOne, deleteOne, createOne } from './handlerFactory.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

export const getPlants = getAll(Plant)
export const getPlant = getOne(Plant)
export const updatePlant = updateOne(Plant)
export const deletePlant = deleteOne(Plant)
export const createPlant = createOne(Plant)
