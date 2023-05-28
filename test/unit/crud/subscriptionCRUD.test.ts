import { SubscriptionCRUD } from "../../../src/crud/SubscriptionCRUD";
import { RepositoryMock } from "../../__mocks__/Repository.mock";


describe("subscriptionCRUD", () => {
    const REPOSITORY = new RepositoryMock()
    const CRUD = new SubscriptionCRUD(REPOSITORY)

    describe("create()", () => {

        it("should call insertOne() from the repository and return obj with statusCode 200 if no error occour", async () => {
            REPOSITORY.insertOne.mockImplementationOnce(() => Promise.resolve({ eventHandlerURI: 'https://www.google.com/', id: 'testId' }))

            const createURL = await CRUD.create({ eventHandlerURI: 'https://www.google.com/' });
            console.log(createURL)
            expect(createURL.statusCode).toBe(200)
            expect(createURL.data).toEqual({ response: { eventHandlerURI: 'https://www.google.com/', id: 'testId' }})
        })

        it("should return statusCode 404 and errorMessage if invalid url is provided", async () => {
            const createURL = await CRUD.create({ eventHandlerURI: 'testUri' });

            expect(createURL.statusCode).toBe(404)
            expect(createURL.data).toEqual({ message: 'Invalid @parameter url' })
        })

        it("should return an obj with statusCode 500 and errorMessage when an error occour", async () => {
            REPOSITORY.insertOne.mockImplementationOnce(() => { throw new Error("TestError") })

            const createURL = await CRUD.create({ eventHandlerURI: 'https://www.google.com/' });

            expect(createURL.statusCode).toBe(500)
            expect(createURL.data).toEqual({ message: 'TestError' })
        })
    })

    describe("getOne()", () => {
        it("should call getOneByKey() from the repository and return obj with statusCode 200 if no error occour", async () => {
            REPOSITORY.getOneByKey.mockImplementationOnce(() => Promise.resolve({ eventHandlerURI: 'testUri', id: 'testId' }))
            
            const findUrl = await CRUD.readOne({eventHandlerURI: 'testUri'})

            expect(findUrl.statusCode).toBe(200)
            expect(findUrl.data).toEqual({ response: { eventHandlerURI: 'testUri', id: 'testId' }})
        })

        it("should return an obj with statusCode 500 and errorMessage when an error occour", async () => {
            REPOSITORY.getOneByKey.mockImplementationOnce(() => { throw new Error("TestError") })

            const createURL = await CRUD.readOne({ eventHandlerURI: 'testUri' });

            expect(createURL.statusCode).toBe(500)
            expect(createURL.data).toEqual({ message: 'TestError' })
        })
    })

    describe("read()", () => {
        it("should call getAll() from the repository and return obj with statusCode 200 in no error occour", async () => {
            REPOSITORY.getAll.mockImplementationOnce(() => Promise.resolve([
                { eventHandlerURI: 'testUri', id: 'testId' },    
                { eventHandlerURI: 'testUri2', id: 'testId2' },    
            ]))

            const findAllUrl = await CRUD.read({})

            expect(findAllUrl.statusCode).toBe(200)
            expect(findAllUrl.data).toEqual({ response: [
                { eventHandlerURI: 'testUri', id: 'testId' },    
                { eventHandlerURI: 'testUri2', id: 'testId2' },     
            ] })
        })

        it("should return an obj with statusCode 500 and errorMessage when an error occour", async () => {
            REPOSITORY.getAll.mockImplementationOnce(() => { throw new Error("TestError") })

            const createURL = await CRUD.read({ eventHandlerURI: 'testUri' });

            expect(createURL.statusCode).toBe(500)
            expect(createURL.data).toEqual({ message: 'TestError' })
        })
    })
})