import { Email, User } from "../../types";
import { AccountNotConfirmed, AccountVerificationFailure } from "../../utils/errors.util";
import userSchema from "./user.schema"

export async function createUser(user: User) {
    try {
        const result = await userSchema.create(user)
        return result
    } catch(error) {
        throw error
    }
}

export async function findUserWithEmail(email: Email) {
    try {
        const user = await userSchema.findOne({ email: email })
        if(!user) throw new AccountVerificationFailure()
        return user
    } catch(error) {
        throw error
    }
}

export async function isAccountConfirmed(user: User) {
    if(!user.confirmed) throw new AccountNotConfirmed()
    return true
}