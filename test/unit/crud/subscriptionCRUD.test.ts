import { SubscriptionCRUD } from "../../../src/crud/SubscriptionCRUD";
import { RepositoryMock } from "../../__mocks__/Repository.mock";


describe("subscriptionCRUD", () => {
    const REPOSITORY = new RepositoryMock()
    const CRUD = new SubscriptionCRUD(REPOSITORY)

    describe("create()", () => {

        it("should save the url in a repository", async () => {
            REPOSITORY.insertOne.mockImplementationOnce(() => Promise.resolve({ eventHandlerURI: 'testUri', id: 'testId' }))

            const createURL = await CRUD.create({ eventHandlerURI: 'testUri' });

            expect(createURL.statusCode).toBe(200)
            expect(createURL.data).toEqual({ response: { eventHandlerURI: 'testUri', id: 'testId' }})
        })
    })

    describe("getOne()", () => {
        it("should call getOneByKey() from the repository and return right obj if no error occour", async () => {
            REPOSITORY.getOneByKey.mockImplementationOnce(() => Promise.resolve({ eventHandlerURI: 'testUri', id: 'testId' }))
            
            const findUrl = await CRUD.readOne({eventHandlerURI: 'testUri'})

            expect(findUrl.statusCode).toBe(200)
            expect(findUrl.data).toEqual({ response: { eventHandlerURI: 'testUri', id: 'testId' }})
        })
    })
})