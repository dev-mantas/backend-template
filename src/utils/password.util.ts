import bcrypt from 'bcrypt'
import { AccountVerificationFailure } from './errors.util'

export async function handleNewPassword(password: string): Promise<string> {
    const saltRounds = 10

    return new Promise(async(resolve, reject) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password, salt)
            resolve(hashedPassword)
        } catch(error) {
            reject(error)
        }
    })
}

export async function verifyUserPassword(hashedPassword: string, password: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hashedPassword)
    if(!result) throw new AccountVerificationFailure()
    return result
}