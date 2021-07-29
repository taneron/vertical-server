import Entry from '../models/entryModel.js'
import { getAll, getOne, updateOne, deleteOne, createOne } from './handlerFactory.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import Plant from '../models/plantModel'

export const getEntrys = getAll(Entry)
export const getEntry = getOne(Entry)
export const updateEntry = updateOne(Entry)
export const deleteEntry = deleteOne(Entry)
// export const createEntry = createOne(Entry)

export const createEntry = catchAsync(async (req, res, next) => {
  const doc = await Entry.create(req.body)
  console.log('plant is', doc.plant, doc.plant.id)

  const plant = await Plant.findByIdAndUpdate(doc.plant, {
    $push: { entries: doc._id },
  })

  if (!plant) return next(new AppError('No plant found', 404))

  res.status(201).json({
    status: 'success',
    data: doc,
  })
})
