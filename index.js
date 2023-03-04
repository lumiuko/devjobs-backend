import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import api from './api.js'

config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use('/api', api)

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
