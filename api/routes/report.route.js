
import express from 'express'
import { createReport } from '../controllers/report.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/report', verifyToken,createReport)

export default router