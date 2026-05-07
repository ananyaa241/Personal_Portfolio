import exp from "express";
import bcryptjs from "bcryptjs";

import { DoctorModel } from "../models/DoctorModel.js";

export const doctorApp = exp.Router();


//register doctor
doctorApp.post("/register", async (req, res, next) => {

    try {

        const doctorData = req.body;

        const doctor = await DoctorModel.findOne({
            email: doctorData.email
        });

        if (doctor) {
            return res.status(409).json({
                message: "Doctor already exists"
            });
        }

        const hashedPassword = await bcryptjs.hash(
            doctorData.password,
            6
        );

        doctorData.password = hashedPassword;

        await DoctorModel.create(doctorData);

        res.status(201).json({
            message: "Doctor registered"
        });

    } catch (err) {
        next(err);
    }

});


//get all doctors
doctorApp.get("/doctors", async (req, res, next) => {

    try {

        const doctors = await DoctorModel.find();

        res.status(200).json({
            payload: doctors
        });

    } catch (err) {
        next(err);
    }

});


//get single doctor
doctorApp.get("/doctor/:id", async (req, res, next) => {

    try {

        const doctor = await DoctorModel.findById(
            req.params.id
        );

        res.status(200).json({
            payload: doctor
        });

    } catch (err) {
        next(err);
    }

});


//update doctor
doctorApp.put("/update-doctor/:id",
async (req, res, next) => {

    try {

        await DoctorModel.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Doctor updated"
        });

    } catch (err) {
        next(err);
    }

});


//delete doctor
doctorApp.delete("/delete-doctor/:id",
async (req, res, next) => {

    try {

        await DoctorModel.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Doctor deleted"
        });

    } catch (err) {
        next(err);
    }

});

//search doctors
doctorApp.get(
    "/search/:key",
    async (req, res, next) => {

        try {

            const doctors =
                await DoctorModel.find({

                    $or: [

                        {
                            name: {
                                $regex: req.params.key,
                                $options: "i"
                            }
                        },

                        {
                            specialization: {
                                $regex: req.params.key,
                                $options: "i"
                            }
                        }

                    ]

                });

            res.status(200).json({

                payload: doctors

            });

        } catch (err) {

            next(err);

        }

    }
);