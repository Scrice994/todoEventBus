import { SubscriptionCRUD } from "../../src/crud/SubscriptionCRUD";
import { RepositoryMock } from "../__mocks__/Repository.mock";


describe("subscriptionCRUD", () => {
    const REPOSITORY = new RepositoryMock()

    describe("create()", () => {

        it("should save the url in a repository", async () => {
            REPOSITORY.insertOne.mockImplementationOnce(() => Promise.resolve({ eventHandlerURI: 'testUri', id: 'testId' }))

            const createURL = await new SubscriptionCRUD(REPOSITORY).create({ eventHandlerURI: 'testUri' });

            expect(createURL.statusCode).toBe(200)
            expect(createURL.data).toEqual({ response: { eventHandlerURI: 'testUri', id: 'testId' }})
        })
    })
})