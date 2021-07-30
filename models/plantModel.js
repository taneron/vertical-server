import mongoose from 'mongoose'
import Increment from 'mongoose-sequence'
let ObjectId = mongoose.Schema.Types.ObjectId

const AutoIncrement = Increment(mongoose)

const plantSchema = new mongoose.Schema({
  name: String,
  referenceNo: {
    type: Number,
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
plantSchema.set('toJSON', { virtuals: true })

plantSchema.pre(/^find/, function (next) {
  if (!this.entries) next()
  // this.populate('entries')
  this.populate('entries')
  // console.log(this.entries)
  next()
})
plantSchema.plugin(AutoIncrement, {
  id: 'referenceNo',
  inc_field: 'referenceNo',
  start_seq: 1000,
})

const Plant = mongoose.model('Plant', plantSchema)

export default Plant
