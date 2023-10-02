import { body, validationResult } from 'express-validator'
import { Request, Response } from 'express'
import { RegisterAccountValidation } from '../../utils/errors.util'
export async function checkValidation(req: Request, res: Response) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        throw new RegisterAccountValidation(errors.array())
    }
    return true
}

export const registerUserValidation = [
    body('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First name is required')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('First name must be alphabetic'),

    body('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last name is required')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Last name must be alphabetic'),

    body('email')
        .exists({ checkFalsy: true })
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail({ all_lowercase: false, gmail_remove_dots: false }),

    body('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required')
        .isLength({ min: 8, max: 32 })
        .withMessage('Password must be between 8 to 32 characters long'),

    body('terms')
        .exists({ checkFalsy: true })
        .withMessage('No value sent for terms')
        .isBoolean()
        .withMessage('Terms must be a boolean value'),
    body('updates')
        .optional()
        .isBoolean()
        .withMessage('Updates must be a boolean value')
];