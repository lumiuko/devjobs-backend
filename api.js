import express from 'express'
import data from './data.js'

const api = express.Router()

api.get('/jobs', (req, res) => {
  const itemsLimit = 12
  const { offset = 0, title, location, forceFullTime } = req.query

  const filteredItems = data.filter(item => {
    const matchesTitle = !title || item.position.toLowerCase().includes(title.toLowerCase())
    const matchesLocation = !location || item.location.toLowerCase().includes(location.toLowerCase())
    const matchesFullTime = forceFullTime === 'true' ? item.contract === 'Full Time' : true

    return matchesTitle && matchesLocation && matchesFullTime
  })

  const slicedItems = filteredItems.slice(offset, Number(offset) + itemsLimit)

  res.json({
    length: filteredItems.length,
    items: slicedItems
  })
})

api.get('/jobs/:id', (req, res) => {
  const { id } = req.params
  const foundItem = data.find(item => item.id === Number(id))

  if (!foundItem) {
    res.sendStatus(404)
    return
  }

  res.json(foundItem)
})

export default api
