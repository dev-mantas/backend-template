import { Types, Schema, model } from 'mongoose'
import { User } from '../../types'

const userSchema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    terms: { type: Boolean, required: true, default: false },
    updates: { type: Boolean, required: true, default: false },
    confirmed: { type: Boolean, required: true, default: false  }
})

export default model('users', userSchema)