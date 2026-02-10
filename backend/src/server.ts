import express from 'express'
import { prisma } from './prisma/client'

const app = express()
app.use(express.json())

app.post('/tags', async (req, res) => {
  const tag = await prisma.tag.create({
    data: { name: req.body.name }
  })

  res.json(tag)
})

app.get('/tags', async (_req, res) => {
  const tags = await prisma.tag.findMany()
  res.json(tags)
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
