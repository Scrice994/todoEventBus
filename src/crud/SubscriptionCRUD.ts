import { SubscriptionEntity } from "src/entities/SubscriptionEntity";
import { ICRUD, ICRUDResponse } from "./ICRUD";
import { IRepository } from "src/repository/IRepository";

export class SubscriptionCRUD implements ICRUD<SubscriptionEntity>{
    constructor(private _repository: IRepository<SubscriptionEntity>){}

    async create(newElement: Omit<SubscriptionEntity, "id">): Promise<ICRUDResponse<SubscriptionEntity>> {
        try {
            const result = await this._repository.insertOne(newElement)

            return {
                statusCode: 200,
                data: {
                    response: result
                }
            }
            
        } catch (error) {
            return {
                statusCode: 500,
                data: {
                    message: `Something went wrong: ${error}`
                }
            }
        }

    }

}