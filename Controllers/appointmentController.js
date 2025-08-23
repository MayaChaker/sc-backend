const express = require("express");
const Appointment = require("../Models/appointmentModel");
const User = require("../Models/userModel");

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
          as: "doctorData",
          where: { role: "Doctor" },
          attributes: ["user_id", "first_name", "last_name", "specialization"],
        },
        {
          model: User,
          as: "patientData",
          attributes: ["user_id", "first_name", "last_name"],
        },
      ],
    });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("getAllAppointments error:", error);
    res.status(500).json({ error: "Failed to retreive appointments" });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const appointment = await Appointment.findByPk(appointment_id, {
      include: [
        {
          model: User,
          as: "doctorData",
          where: { role: "Doctor" },
          attributes: ["user_id", "first_name", "last_name", "specialization"],
        },
        {
          model: User,
          as: "patientData",
          attributes: ["user_id", "first_name", "last_name"],
        },
      ],
    });
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("getAppointmentByid error:", error);
    res.status(500).json({ error: "failed to retreive appointment" });
  }
};

const createAppointment = async (req, res) => {
  try {
    const { doctor, patient, date, time, status } = req.body;
    const newAppointment = await Appointment.create({
      doctor,
      patient,
      date,
      time,
      status,
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("createAppointment error:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    appointment.status = status;
    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    console.error("updateAppointment error:", error);

    res.status(500).json({ error: "Failed to update appointment" });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    await appointment.destroy();
    res.status(200).send();
  } catch (error) {
    console.error("deletAppointment error:", error);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
