import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { AlbumSchema } from '../models/Album';
import { CollaboratorSchema } from '../models/Collaborator';
import { PictureSchema } from '../models/Picture';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Albums = mongoose.model('Album', AlbumSchema);
  Pictures = mongoose.model('Picture', PictureSchema);
  Collaborators = mongoose.model('Collaborator', CollaboratorSchema);
}

export const dbContext = new DbContext()
