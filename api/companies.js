import express from 'express'
import prisma from '../utils/prisma.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const companies = await prisma.company.findMany()

  res.json(companies)
})

router.post('/', async (req, res) => {
  const { name, website, logo, logoBackground } = req.body

  if (!name || !website || !logo || !logoBackground) {
    res.sendStatus(400)
    return
  }

  const company = await prisma.company.create({
    data: {
      name,
      website,
      logo,
      logoBackground
    }
  })

  res.status(201).json(company)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const deletedCompany = await prisma.company.delete({
    where: {
      id: Number(id)
    }
  })

  res.status(204).json(deletedCompany)
})

export default router
