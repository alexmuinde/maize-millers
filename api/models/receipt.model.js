

import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema(
    {
        currentDate : {
            type: String,
            required: true
        },
        description : {
            type: String,
            required: true
        },
        paymentMethod : {
            type: String,
            required: true
        },
        bankReferenceNumber : {
            type: String,
            required: true
        },
        amount : {
            type: Number,
            required: true
        },
        vat : {
            type: Number,
            required: true
        },
        vatAmount : {
            type: Number,
            required: true
        },
        totalAmount : {
            type: Number,
            required: true
        },
        userRef : {
            type: String,
            required: true
        },

    }, {timestamps: true}
)

const Receipt = mongoose.model('Receipt', receiptSchema)

export default Receipt