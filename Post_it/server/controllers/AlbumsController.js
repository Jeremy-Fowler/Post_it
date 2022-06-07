import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService";
import { collaboratorsService } from "../services/CollaboratorService";
import { picturesService } from "../services/PicturesService";
import BaseController from "../utils/BaseController";

export class AlbumsController extends BaseController {
  constructor () {
    super('api/albums')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/collaborators', this.getCollaborators)
      .get('/:id/pictures', this.getPictures)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }
  async getAll(req, res, next) {
    try {
      const albums = await albumsService.getAll(req.query)
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const album = await albumsService.getById(req.params.id)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getCollaborators(req, res, next) {
    try {
      const collabs = await collaboratorsService.getCollaborators(req.params.id)
      return res.send(collabs)
    } catch (error) {
      next(error)
    }
  }

  async getPictures(req, res, next) {
    try {
      const pictures = await picturesService.getPictures(req.params.id)
      return res.send(pictures)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const album = await albumsService.create(req.body)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }
}