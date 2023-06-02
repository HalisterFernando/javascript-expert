class NotImplementedException extends Error {
    constructor(message) {
        super(`${message} as called without implementation`)
        this.name = "NotImplementedException"
    }
}

export { NotImplementedException }