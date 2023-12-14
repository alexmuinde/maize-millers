
import express from 'express'
import { createReceipt } from '../controllers/receipt.controller.js'
import { verifyToken } from '../utils/verifyUser.js'


const router = express.Router()

router.post('/receipt', verifyToken, createReceipt)

export default router