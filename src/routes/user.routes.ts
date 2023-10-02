import express, { Request, Response } from 'express'
import { loginUser, registerUser } from '../services/user/user.service'
import { registerUserValidation } from '../services/user/user.validation'
export const user_routes = express.Router()

user_routes.post('/register', registerUserValidation, registerUser)

user_routes.post('/login', loginUser)