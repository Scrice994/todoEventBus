import { IRepository } from "../../src/repository/IRepository";
import { SubscriptionEntity } from '../../src/entities/SubscriptionEntity'

export class RepositoryMock implements IRepository<SubscriptionEntity>{
    
    getAll = jest.fn()

    getOneByKey = jest.fn()

    insertOne = jest.fn()

}