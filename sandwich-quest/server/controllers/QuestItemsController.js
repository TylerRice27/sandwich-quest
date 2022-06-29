import { Auth0Provider } from "@bcwdev/auth0provider"
import { questItemsService } from "../services/QuestItemsService"
import BaseController from "../utils/BaseController"



export class QuestItemsController extends BaseController {
    constructor() {
        super('api/items')
        this.router
            .get('', this.getAllItems)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createItem)
            .put('/:id', this.editItem)
            .delete('/:id', this.removeItem)
    }


    async getAllItems(req, res, next) {
        try {
            const Items = await questItemsService.getAllItems()
            return res.send(Items)
        } catch (error) {
            next(error)
        }
    }

    async createItem(req, res, next) {
        try {
            const Item = await questItemsService.createItem(req.body)
            return res.send(Item)
        } catch (error) {
            next(error)
        }

    }

    async editItem(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const Item = await questItemsService.editItem(req.userInfo.id, req.body)
            return res.send(Item)
        } catch (error) {
            next(error)

        }
    }
    async removeItem(req, res, next) {
        try {
            const Item = await questItemsService.removeItem(req.params.id, req.userInfo.id)
            return res.send('This items has been deleted', Item)
        } catch (error) {
            next(error)
        }
    }




}

