import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AlbumsService {
  async getAlbums() {
    const res = await api.get('api/albums')
    logger.log(res.data)
    AppState.albums = res.data
  }
  async getById(id) {
    const res = await api.get('api/albums/' + id)
    logger.log(res.data)
    AppState.album = res.data
  }
}

export const albumsService = new AlbumsService()