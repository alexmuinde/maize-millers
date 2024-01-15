

import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
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
        samplingMethod : {
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
        batchNo : {
            type: String,
            required: true
        },
        imageUrls: {
            type: Array,
            required: true,
          },
        userRef : {
            type: String,
            required: true
        },

    }, {timestamps: true}
)

const Report = mongoose.model('Report', reportSchema)

export default Report 