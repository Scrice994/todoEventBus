
export const checkUri = (url: string) => {
    try {
        new URL(url)
    } catch (error) {
        return false
    }

    return true
}