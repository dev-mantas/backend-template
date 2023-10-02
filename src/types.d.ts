import { Types } from "mongoose"

export interface User {
    firstName: FirstName
    lastName: LastName
    email: Email
    password: Passowrd
    userType: UserType 
    terms: Terms
    updates: Updates
    confirmed: Confirmed 
}

export type FirstName = string
export type LastName = string
export type Email = string
export type Password = string
export type UserType = 'User' | 'Admin'
export type Terms = boolean
export type Updates = boolean
export type Confirmed = boolean