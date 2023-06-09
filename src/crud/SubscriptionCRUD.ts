import { SubscriptionEntity } from "src/entities/SubscriptionEntity";
import { ICRUD, ICRUDResponse } from "./ICRUD";
import { IRepository } from "src/repository/IRepository";
import { checkUri } from '../utils/common/checkUri'

export class SubscriptionCRUD implements ICRUD<SubscriptionEntity>{
    constructor(private _repository: IRepository<SubscriptionEntity>){}

    async read(obj: { [key: string]: unknown; }): Promise<ICRUDResponse<SubscriptionEntity[]>> {
        try {
            const result = await this._repository.getAll(obj)
            return this.successfullResponse(result)
        } catch (error) {
            return this.errorResponse(error)
        }
    }

    async readOne(obj: { [key: string]: unknown; }): Promise<ICRUDResponse<SubscriptionEntity>> {
        try {
            const result = await this._repository.getOneByKey(obj)
            return this.successfullResponse(result)
        } catch (error) {
            return this.errorResponse(error)
        }
    }

    async create(newElement: Omit<SubscriptionEntity, "id">): Promise<ICRUDResponse<SubscriptionEntity>> {
        try {
            const urlValidation = checkUri(newElement.eventHandlerURI)

            if(!urlValidation){
                return this.customErrorResponse(404, 'Invalid @parameter url')
            }

            const result = await this._repository.insertOne(newElement)
            return this.successfullResponse(result)  
        } catch (error) {
            return this.errorResponse(error)
        }

    }

    private successfullResponse(result: any){
       return {
            statusCode: 200,
            data: {
                response: result
            }
        }
    }

    private customErrorResponse(statusCode: number, customErrorMessage: string){
        return {
            statusCode: statusCode,
            data: {
                message: customErrorMessage,
            }
        }
    }

    private errorResponse(error: any){
        if (error instanceof Error){
            return {
                statusCode: 500,
                data: {
                    message: error.message,
                },
            };
        } else {
            return {
                statusCode: 500,
                data: {
                    message: `An unknown error occured: ${error}`
                }
            }    
        }
    }

}