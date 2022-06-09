import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { albumsService } from "./AlbumsService"

class CollaboratorsService {
  async getMyAlbums(accountId) {
    const albums = await dbContext.Collaborators.find({ accountId }).populate('album')
    return albums
  }
  async getCollaborators(albumId) {
    const collabs = await dbContext.Collaborators.find({ albumId }).populate('account', 'name picture')
    return collabs
  }
  async create(body) {
    const badCollab = await this.getOne(body)
    if (badCollab) {
      throw new Forbidden('Already a collaborator')
    }
    const collab = await dbContext.Collaborators.create(body)
    await collab.populate('account', 'name picture')
    await collab.populate('album')
    return collab
  }

  async getOne(body) {
    const collab = await dbContext.Collaborators.findOne({ accountId: body.creatorId || body.accountId, albumId: body.albumId })
    return collab
  }
}

export const collaboratorsService = new CollaboratorsService()