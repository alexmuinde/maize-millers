
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        source : {
            type: String,
            required: true
        },
        commodity : {
            type: String,
            required: true
        },
        phoneNumber : {
            type: String,
            required: true
        },
        sampleReferenceNumber : {
            type: String,
            required: true
        },
        dateSampleReceived : {
            type: String,
            required: true
        },
        dateSampleAnalyzed : {
            type: String,
            required: true
        },
        methodOfTest : {
            type: String,
            required: true
        },
        referenceStandard : {
            type: String,
            required: true
        },
        parameter : {
            type: String,
            required: true
        },
        results : {
            type: String,
            required: true
        },
        maximumLimit : {
            type: String,
            required: true
        },
        remarks : {
            type: String,
            required: true
        },
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

const Listing = mongoose.model('Listing', listingSchema)

export default Listing 