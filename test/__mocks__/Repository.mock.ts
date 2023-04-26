import { IRepository } from "../../src/repository/IRepository";
import { SubscriptionEntity } from '../../src/entities/SubscriptionEntity'

export class RepositoryMock implements IRepository<SubscriptionEntity>{

    insertOne = jest.fn()

}