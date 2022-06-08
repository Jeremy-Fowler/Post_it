import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CollaboratorsService {
  async getCollaborators(albumId) {
    const res = await api.get('api/albums/' + albumId + '/collaborators')
    logger.log(res.data)
    AppState.collaborators = res.data
  }

  async getMyAlbums() {
    const res = await api.get('account/albums')
    logger.log(res.data)
    AppState.myAlbums = res.data
  }

  async create(albumId) {
    const res = await api.post('api/collaborators', { albumId })
    logger.log(res.data)
    AppState.collaborators.push(res.data)
    AppState.myAlbums.push(res.data)
  }
}

export const collaboratorsService = new CollaboratorsService()