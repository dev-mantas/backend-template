import { Request, Response } from 'express' 
import { createUser, findUserWithEmail, isAccountConfirmed } from "./user.functions";
import { handleNewPassword, verifyUserPassword } from '../../utils/password.util';
import { AccountVerificationFailure, RegisterAccountValidation, TermsNotAccepted, AccountNotConfirmed } from '../../utils/errors.util';
import { checkValidation } from './user.validation';
import { MongoError } from 'mongodb'

export async function registerUser(req: Request, res: Response) {
    const { firstName, lastName, email, password, terms, updates } = req.body

    try {
        const validate = await checkValidation(req, res)
        const hashedPassword = await handleNewPassword(password)
        const result = await createUser({ firstName, lastName, email, password: hashedPassword, terms, updates, userType: 'User', confirmed: false})
        return res.status(200).send("SUCCESS")
    } catch(error) {
        if(error instanceof RegisterAccountValidation) {
            return res.status(500).send(error.errMessages)
        }

        if(error instanceof TermsNotAccepted) {
            return res.status(500).send(error.message)
        }

        if(error instanceof MongoError) {
            if(error.code === 11000) {
                return res.status(500).send("Email already in use.")
            }
        }
        return res.status(500).send("Registration failed.")
    }
}
export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body

    try {
        const user = await findUserWithEmail(email)
        const isPasswordCorrect = await verifyUserPassword(user.password, password)
        await isAccountConfirmed(user)

        return res.status(200).send(user)
    } catch(error) {
        if(error instanceof AccountVerificationFailure) {
            return res.status(500).send(error.message)
        }

        if(error instanceof AccountNotConfirmed) {
            return res.status(500).send(error.message)
        }
        return res.status(500).send("Login failed.")
    }
}