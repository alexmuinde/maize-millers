import Receipt from "../models/receipt.model.js"

export const createReceipt = async (req, res, next) => {
    try {
        const receipt = await Receipt.create(req.body)
        return res.status(201).json(receipt)
    } catch (error) {
        next(error)
    }
}