import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PictureSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    imgUrl: { type: String, required: true },
    albumId: { type: Schema.Types.ObjectId, required: true, ref: 'Album' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PictureSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
