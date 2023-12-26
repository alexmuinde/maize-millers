
import express from 'express'
import { createReport, updateReport, getReport, getReports} from '../controllers/report.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/report', verifyToken,createReport)
router.post('/update/:id', verifyToken, updateReport)
router.get('/get/:id',  getReport)
router.get('/get', getReports)


export default router