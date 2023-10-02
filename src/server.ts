import express, {Request, Response} from 'express'
import cors from 'cors'
import { user_routes } from './routes/user.routes'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

const ENV = 'dev'
dotenv.config({ path: `.env.${ENV}`})


const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', user_routes)
const PORT = process.env.PORT








app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})