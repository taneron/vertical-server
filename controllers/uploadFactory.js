import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import multer from 'multer'
import sharp from 'sharp'
import fs from 'fs'
const multerStorage = multer.memoryStorage()

const multerImage = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true)
    } else {
      cb(new AppError('Not an image! Please upload only images.', 400), false)
    }
  },
})

export const uploadOne = (field) => multerImage.single(field)

export const resizeImage = (
  field,
  path = 'uploads',
  imageSize = [1920, 1080],
  imageQuality = 90,
  format = 'jpeg'
) => {
  return catchAsync(async (req, res, next) => {
    try {
      if (!req.file) return next()

      req.file.filename = `${path}-${req.body.name.replace(/\s+/g, '-').toLowerCase()}-${new Date()
        .toISOString()
        .replace(/T.*/, '')
        .split('-')
        .reverse()
        .join('-')}.${format}`

      let dir = `public/img/${path}`
      if (!fs.existsSync(`./${dir}`)) {
        fs.mkdirSync(dir)
      }

      await await sharp(req.file.buffer)
        .resize(imageSize[0], imageSize[1])
        .toFormat(format)
        .jpeg({ quality: imageQuality })
        .toFile(`${dir}/${req.file.filename}`)

      req.body.image = `img/${path}/${req.file.filename}`
      next()
    } catch (error) {
      console.log(error)
      next(new AppError('Something with resizing the image went wrong!', 400))
    }
  })
}
