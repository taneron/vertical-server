import mongoose from 'mongoose'
import Increment from 'mongoose-sequence'
let ObjectId = mongoose.Schema.Types.ObjectId

const AutoIncrement = Increment(mongoose)
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const plantSchema = new mongoose.Schema({
  referenceNo: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  entries: [
    {
      type: ObjectId,
      ref: 'Entry',
    },
  ],
})

plantSchema.plugin(AutoIncrement, {
  id: 'referenceNo',
  inc_field: 'referenceNo',
  start_seq: 1000,
})

plantSchema.pre(/^save/, function (next) {
  this.updatedAt = Date.now()
  next()
})

plantSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'entries',
    // select: 'field',
  })
  next()
})

plantSchema.set('toJSON', { virtuals: true })

const Plant = mongoose.model('Plant', plantSchema)

export default Plant
