import { Schema, model } from "mongoose";

const prescriptionSchema = new Schema({

    patientId: {
        type: Schema.Types.ObjectId,
        ref: "patient"
    },

    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "doctor"
    },

    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: "appointment"
    },

    medicines: [

        {
            medicineName: String,
            dosage: String,
            duration: String
        }

    ],

    notes: String

}, { timestamps: true });

export const PrescriptionModel =
    model("prescription", prescriptionSchema);