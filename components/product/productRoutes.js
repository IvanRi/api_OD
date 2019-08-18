import { Router } from 'express'
const router = Router()
import { listAllProduct } from './productController'

router.get('/', listAllProduct)

export default router