import Entry from '../models/entryModel'
import { getAll, getOne, updateOne, deleteOne, createOne } from './handlerFactory'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'

export const getEntrys = getAll(Entry)
export const getEntry = getOne(Entry)
export const updateEntry = updateOne(Entry)
export const deleteEntry = deleteOne(Entry)
export const createEntry = createOne(Entry)
