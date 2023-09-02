export class fetchError extends Error {
    constructor(message = "An error occurred while fetching.") {
        super(message)
        this.name = "fetchError"
    }
}

export class AuthRequiredError extends Error {
    constructor(message = "You must be logged in to see this page. User is not signed in.") {
        super(message)
        this.name = "Auth Required Error"
    }
}