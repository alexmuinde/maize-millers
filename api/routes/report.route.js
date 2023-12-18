
import express from 'express'
import { createReport, updateReport } from '../controllers/report.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/report', verifyToken,createReport)
router.post('/update/:id', verifyToken, updateReport)

export default router