import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PicturesService {
  async getPictures(albumId) {
    const res = await api.get('api/albums/' + albumId + '/pictures')
    logger.log(res.data)
    AppState.pictures = res.data
  }
  async create(data) {
    const res = await api.post('api/pictures', data)
    logger.log(res.data)
    AppState.pictures.push(res.data)
  }
}

export const picturesService = new PicturesService()