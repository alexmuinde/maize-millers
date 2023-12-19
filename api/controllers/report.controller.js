import Report from "../models/report.model.js"
import { errorHandler } from "../utils/errors.js"

export const createReport = async (req, res, next) => {
    try {
        const report = await Report.create(req.body)
        return res.status(201).json(report)
    } catch (error) {
        next(error)
    }
}

export const updateReport = async (req, res, next) => {
    const report = await Report.findById(req.params.id)
    if(!report){
        return next (errorHandler(404, 'Report not found'))
    }
    if(req.user.id !== report.userRef){
        return next (errorHandler(401, 'You can only update your own listing'))
    }
    try {
        const updatedReport = await Report.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updatedReport)
    } catch (error) {
        next(error)
    }
}

export const getReport = async (req, res, next) => {
    try {
         const report = await Report.findById(req.params.id)
         if(!report){
            return next(errorHandler(404, 'Report not found'))
         }
         res.status(200).json(report)
    } catch (error) {
        next(error)
    }
}