import { SubscriptionRepository } from '../../../src/repository/SubscriptionRepository'
import { DataStorageMock } from '../../__mocks__/DataStorage.mock'

describe("subcriptionREPOSITORY", () => {
    const mockStorage = new DataStorageMock()
    const REPOSITORY = new SubscriptionRepository(mockStorage)

    describe("insertOne()", () => {
        it("should insert a new url in the data storage", async () => {
            mockStorage.create.mockImplementationOnce(() => Promise.resolve({ eventHandlerURI: 'testUri', id: 'testId' }))

            const insertSubscription = await REPOSITORY.insertOne({ eventHandlerURI: 'testUri' })

            expect(insertSubscription).toEqual({ eventHandlerURI: 'testUri', id: 'testId' })
        })
    })

    describe("getOneByKey()", () => {
        it("should call findOneByKey from the dataStorage and return the result", async () => {
            mockStorage.findOneByKey.mockImplementationOnce(() => Promise.resolve({ eventHandlerURI: 'testUri', id: 'testId' }));

            const findSubscription = await REPOSITORY.getOneByKey({ eventHandlerURI: 'testUri' })
    
            expect(findSubscription).toEqual({ eventHandlerURI: 'testUri', id: 'testId' })
        })
    })
})