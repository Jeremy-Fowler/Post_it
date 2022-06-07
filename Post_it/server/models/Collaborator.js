import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CollaboratorSchema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    albumId: { type: Schema.Types.ObjectId, required: true, ref: 'Album' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CollaboratorSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})