import { ValidationError } from "express-validator"

export class UnknownError extends Error {
    constructor(error: unknown) {
        super()
        this.name = 'UnknownError'
        this.message = 'An unknown error has occured, admins have been notified.'
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class AccountVerificationFailure extends Error {
    constructor() {
        super()
        this.name = 'AccountVerificationFailure'
        this.message = 'Failed to verify account, please try again.'
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class AccountNotConfirmed extends Error {
    constructor() {
        super()
        this.name = 'AccountNotConfirmed'
        this.message = 'You must confirm your account, an email has been sent to your email address.'
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class TermsNotAccepted extends Error {
    constructor() {
        super()
        this.name = 'TermsNotAccepted'
        this.message = 'You must accept the terms and conditions.'
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class RegisterAccountValidation extends Error {
    errMessages: string[]
    constructor(error: ValidationError[]) {
        super()
        console.log(error)
        this.name = 'RegisterAccountValidation'
        this.message = 'Failed to validate fields, please try again.'
        this.errMessages = []
        error.forEach((item: ValidationError) => {
            this.errMessages.push(item.msg)
        });
        Object.setPrototypeOf(this, new.target.prototype) 
    }
}