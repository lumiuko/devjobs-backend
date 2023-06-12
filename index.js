import express from 'express'
import cors from 'cors'
import api from './api/index.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', api)

app.listen(3000, () => {
  console.log('Server has started on port 3000...')
})
