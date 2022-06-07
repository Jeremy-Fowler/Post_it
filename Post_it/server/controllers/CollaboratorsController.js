import { Auth0Provider } from "@bcwdev/auth0provider";
import { collaboratorsService } from "../services/CollaboratorService";
import BaseController from "../utils/BaseController";

export class CollaboratorsController extends BaseController {
  constructor () {
    super('api/collaborators')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }
  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const collab = await collaboratorsService.create(req.body)
      return res.send(collab)
    } catch (error) {
      next(error)
    }
  }
}