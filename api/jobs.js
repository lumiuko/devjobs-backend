import express from 'express'
import prisma from '../utils/prisma.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const itemsLimit = 12
  const { offset = 0, title, location, forceFullTime } = req.query

  const items = await prisma.job.findMany({
    include: { company: true, requirements: true, role: true }
  })

  const filteredItems = items.filter(item => {
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

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const foundItem = await prisma.job.findFirst({
    where: { id: Number(id) },
    include: { company: true, requirements: true, role: true }
  })

  res.json(foundItem)
})

router.post('/', async (req, res) => {
  const { companyId, position, contract, location, apply, description } = req.body
  const { requirements, role } = req.body

  const createdJob = await prisma.job.create({
    data: {
      company: { connect: { id: companyId } },
      position,
      contract,
      location,
      apply,
      description,
      postedAt: new Date(),
      requirements: {
        create: {
          content: requirements.content,
          items: requirements.items
        }
      },
      role: {
        create: {
          content: role.content,
          items: role.items
        }
      }
    },
    include: { company: true, requirements: true, role: true }
  })

  res.status(201).json(createdJob)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await prisma.job.delete({
    where: { id: Number(id) }
  })

  res.sendStatus(204)
})

export default router
