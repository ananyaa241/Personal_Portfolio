import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({

    patientId: {
        type: Schema.Types.ObjectId,
        ref: "patient"
    },

    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "doctor"
    },

    appointmentDate: {
        type: Date,
        required: true
    },

    symptoms: String,

    status: {
        type: String,
        enum: [
            "Pending",
            "Approved",
            "Completed",
            "Cancelled"
        ],
        default: "Pending"
    },

    prescriptionId: {
        type: Schema.Types.ObjectId,
        ref: "prescription"
    }

}, { timestamps: true });

export const AppointmentModel =
    model("appointment", appointmentSchema);