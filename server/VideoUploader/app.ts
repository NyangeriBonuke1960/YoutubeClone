import express from 'express'
import dotenv from 'dotenv'
import router from './routers/route'
require('./db.ts')
dotenv.config()

const app = express()

require('./db.ts')

const port: string | undefined = process.env.PORT

app.use(express.json())

app.use('/api', router)

app.post('/hello', (req, res) => {
    res.status(200).json('Hello')
})

app.listen(port, () => {
    console.log('Server started')
})