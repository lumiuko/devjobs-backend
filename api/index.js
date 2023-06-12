import express from 'express'
import companies from './companies.js'
import jobs from './jobs.js'

const api = express.Router()

api.use('/companies', companies)
api.use('/jobs', jobs)

export default api
