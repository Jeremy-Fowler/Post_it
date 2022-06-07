import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AlbumSchema = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    imgUrl: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

AlbumSchema.virtual('collaborators', {
  localField: '_id',
  foreignField: 'albumId',
  ref: 'Collaborator'
})


