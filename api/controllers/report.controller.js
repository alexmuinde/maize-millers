import Report from "../models/report.model.js"

export const createReport = async (req, res, next) => {
    try {
        const report = await Report.create(req.body)
        return res.status(201).json(report)
    } catch (error) {
        next(error)
    }
}