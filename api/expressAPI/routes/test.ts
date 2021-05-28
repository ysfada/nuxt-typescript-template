import { Router } from 'express'

const router = Router()

router.use('/test', (_req, res) => {
  res.end('Test API!')
})

export default router
