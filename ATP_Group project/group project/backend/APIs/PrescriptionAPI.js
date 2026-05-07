import exp from "express";

import { PrescriptionModel }
from "../models/PrescriptionModel.js";

export const prescriptionApp = exp.Router();


//add prescription
prescriptionApp.post(
    "/add",
    async (req, res, next) => {

        try {

            const prescription =
                await PrescriptionModel.create(
                    req.body
                );

            res.status(201).json({

                message: "Prescription added",

                payload: prescription

            });

        } catch (err) {

            next(err);

        }

    }
);


//get prescriptions by patient
prescriptionApp.get(
    "/patient/:patientId",
    async (req, res, next) => {

        try {

            const prescriptions =
                await PrescriptionModel.find({

                    patientId:
                    req.params.patientId

                })
                .populate("doctorId")
                .populate("appointmentId");

            res.status(200).json({

                payload: prescriptions

            });

        } catch (err) {

            next(err);

        }

    }
);