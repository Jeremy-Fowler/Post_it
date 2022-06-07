import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { albumsService } from "./AlbumsService"
import { collaboratorsService } from "./CollaboratorService"

class PicturesService {
  async create(body) {
    const collab = await collaboratorsService.getOne(body)
    const album = await albumsService.getById(body.albumId)
    if (!collab && album.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You must be a collaborator or an album creator to post pictures')
    }
    const picture = await dbContext.Pictures.create(body)
    await picture.populate('creator', 'name picture')
    return picture
  }
  async getPictures(albumId) {
    const pictures = await dbContext.Pictures.find({ albumId }).populate('creator', 'name picture')
    return pictures
  }


}

export const picturesService = new PicturesService()