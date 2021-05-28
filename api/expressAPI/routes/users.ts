import { Router } from 'express'

const router = Router()

const users = [
  { name: 'Liam' },
  { name: 'Olivia' },
  { name: 'Noah' },
  { name: 'Emma' },
]

router.get('/users', function (_req, res, _next) {
  res.json(users)
})

router.get('/users/:id', function (req, res, _next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

export default router
