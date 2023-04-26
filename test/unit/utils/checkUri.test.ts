import { checkUri } from '../../../src/utils/common/checkUri'

describe('checkUri', () => {
    it("should return true if the given param is a valid url", () => {
        const result = checkUri('https://www.google.com/')

        expect(result).toBe(true)
    })

    it("shoudl return false if the given param is an invalid url", () => {
        const result = checkUri('testiUri')

        expect(result).toBe(false)
    })
})