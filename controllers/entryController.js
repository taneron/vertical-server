import Entry from '../models/entryModel.js'
import { getAll, getOne, updateOne, deleteOne, createOne } from './handlerFactory.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

export const getEntrys = getAll(Entry)
export const getEntry = getOne(Entry)
export const updateEntry = updateOne(Entry)
export const deleteEntry = deleteOne(Entry)
export const createEntry = createOne(Entry)
