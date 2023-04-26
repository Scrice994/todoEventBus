import { SubscriptionEntity } from "src/entities/SubscriptionEntity";
import { IRepository } from "./IRepository";
import { IDataStorage } from "src/dataStorage/IDataStorage";

export class SubscriptionRepository implements IRepository<SubscriptionEntity>{
    constructor(private _dataStorage: IDataStorage<SubscriptionEntity>){}

    async insertOne(newEntity: Omit<SubscriptionEntity, "id">): Promise<SubscriptionEntity> {
        const result = await this._dataStorage.create(newEntity)

        return result
    }
    
}