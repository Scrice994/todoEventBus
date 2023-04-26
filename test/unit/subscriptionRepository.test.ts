import { SubscriptionRepository } from '../../src/repository/SubscriptionRepository'
import { DataStorageMock } from '../__mocks__/DataStorage.mock'

describe("subcriptionREPOSITORY", () => {
    describe("insertOne()", () => {
        const mockStorage = new DataStorageMock()
        it("should insert a new url in the data storage", async () => {
            mockStorage.create.mockImplementationOnce(() => Promise.resolve({ eventHandlerURI: 'testUri', id: 'testId' }))

            const insertSubscription = await new SubscriptionRepository(mockStorage).insertOne({ eventHandlerURI: 'testUri' })

            expect(insertSubscription).toEqual({ eventHandlerURI: 'testUri', id: 'testId' })
        })
    })
})