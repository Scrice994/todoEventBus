import { connectFakeDB, dropFakeDB, dropFakeCollections } from "./mongoDataStorageSetup";
import { Subscription } from "../../src/entities/mongo/subscriptionSchema"
import { SubscriptionEntity } from "../../src/entities/SubscriptionEntity";
import { MongoDataStorage } from '../../src/dataStorage/MongoDataStorage'

describe('MongoDataStorage', () => {

    beforeAll( async () => {
        connectFakeDB()
    })
    afterAll(async () => {
        dropFakeDB()
    })
    beforeEach(async () => {
        dropFakeCollections()
    })

    const DATA_STORAGE = new MongoDataStorage<SubscriptionEntity>(Subscription)

    describe('create()', () => {

        it("Should return the new saved entity", async () => {
            const createEntity = await DATA_STORAGE.create({ eventHandlerURI: 'testURI' })

            console.log(createEntity)

            expect(createEntity).toEqual({ eventHandlerURI: 'testURI' , id: createEntity.id })
        })
    })

    describe('findOne()', () => {
        it("Should return the element with  property equal to the given parameter", async () => {
            const createEntity = await DATA_STORAGE.create({ eventHandlerURI: 'testURI' })

            const findElement = await DATA_STORAGE.findOne({ eventHandlerURI: 'testURI' })

            console.log(findElement)

            expect(findElement).toEqual(createEntity)
        })
    })
})