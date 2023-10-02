import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(String(process.env.MONGO_URI))
        console.log('Connection to database established...')
    } catch(error) {
        console.log(error)
        console.log('Failed to connect to database... stopping the server...')
        process.exit(1)
    }
}