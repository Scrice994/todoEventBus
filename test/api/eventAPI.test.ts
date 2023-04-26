import axios from 'axios'
import { databaseConnection, clearDatabase, clearCollection, closeDatabaseConnection } from './mongooseTestUtils'

describe("EventAPI", () => {
    const URL = "http://localhost:4005"

    beforeAll(async() => {
        await databaseConnection()
        await clearDatabase()
    })

    afterEach(async() => {
        await clearCollection('subscriptions')
    })

    afterAll(async() => {
        await closeDatabaseConnection()
    })

    describe("/events", () => {
        it("Should return event send", async () => {
            const result = await axios.post(URL + '/events', { eventType: 'Evento' })

            console.log(result.data)
    
            expect(result.data).toEqual({ eventType: 'Evento' })
            expect(Array.isArray(result.data.subscriptions)).toBe(true)
        })
    })

    describe("/subscription", () => {
        it("should return 200 statusCode when a service subcribe", async () => {
            const result = await axios.post(URL + '/subscription', { url: 'https://www.google.com/' })
    
            expect(result.status).toBe(200)
            expect(result.data).toEqual('https://www.google.com/')
        })
    
        it("should return 400 statusCode when an invalid url is provided", async () => {
            await axios.post(URL + '/subscription', { url: 'testUrl' }).catch(res => {
                expect(res.response.status).toBe(400)
                expect(res.response.data).toEqual({ message: 'invalid url provided' })
            })
        })

        it("should return statusCode 409 when provided url is already saved in the db", async () => {
            await axios.post(URL + '/subscription', { url: 'https://www.google.com/' })

            await axios.post(URL + '/subscription', { url: 'https://www.google.com/' }).catch( res => {
                expect(res.response.status).toBe(409)
                expect(res.response.data).toEqual({ message: 'this url already exist' })
            })         
        })
    })
})