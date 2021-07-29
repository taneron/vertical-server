import mongoose from 'mongoose'
let ObjectId = mongoose.Schema.Types.ObjectId

const entrySchema = new mongoose.Schema({
  plant: {
    type: ObjectId,
    ref: 'Plant',
    required: [true, "An entry needs a plant it's referring to"],
  },
  biomass: { type: Number, required: [true, 'An entry needs a biomass in g'] },
  ph: { type: Number, min: 0, max: 14 },
  notiz: {
    type: String,
    trim: true,
  },
  image: String,
  date: { type: Date, default: Date.now() },
  updateOne: { type: Date, default: Date.now() },
})

entrySchema.pre(/^save/, function (next) {
  this.updatedAt = Date.now()
  next()
})

entrySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'plant',
    select: '-entries',
  })
  next()
})

entrySchema.set('toJSON', { virtuals: true })

const Entry = mongoose.model('Entry', entrySchema)

export default Entry
