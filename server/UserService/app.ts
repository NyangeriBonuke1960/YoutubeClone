import express from 'express'
import dotenv from 'dotenv'
import router from './routes/route'
dotenv.config()

const app = express()

app.use(express.json())

app.use('/api', router)

require('./db.ts')

app.listen(process.env.PORT, () => {
    console.log('Server started')
})