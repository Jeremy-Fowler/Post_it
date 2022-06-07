import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService";
import BaseController from "../utils/BaseController";

export class PicturesController extends BaseController {
  constructor () {
    super('api/pictures')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const picture = await picturesService.create(req.body)
      return res.send(picture)
    } catch (error) {
      next(error)
    }
  }
}