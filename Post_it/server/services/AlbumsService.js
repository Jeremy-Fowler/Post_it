import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class AlbumsService {
  getAll(query = {}) {
    const albums = dbContext.Albums.find({ query }).populate('creator', 'name picture')
    return albums
  }
  async getById(id) {
    const album = await dbContext.Albums.findById(id).populate('creator', 'name picture')
    if (!album) {
      throw new BadRequest('No Album Found')
    }
    return album
  }
  async create(body) {
    const album = await dbContext.Albums.create(body)
    await album.populate('creator', 'name picture')
    return album
  }

}

export const albumsService = new AlbumsService()