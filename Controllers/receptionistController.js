const bcrypt = require("bcrypt");
const Appointment = require("../Models/appointmentModel");
const User = require("../Models/userModel");

exports.createAppointment = async (req, res) => {
  try {
    const app = await Appointment.create(req.body);
    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ Message: "Failed to create appointment" });
  }
};
exports.updateAppointment = async (req, res) => {
  try {
    const app = await Appointment.findByPk(req.params.id);
    if (!app) return res.status(404).json({ message: "Appointment not found" });
    await app.update(req.body);
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment" });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const data = { ...req.body, role: "Patient" };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const newPatient = await User.create(data);
    const patient = newPatient.get({ plain: true });
    delete patient.password;
  } catch (error) {
    res.status(500).json({ message: "Failed to create patient" });
  }
};
exports.checkIn = async (req, res) => {
  try {
    const app = await Appointment.findByPk(req.params.id);
    if (!app) return res.status(404).json({ message: "Appointment not found" });
    await app.update({ status: "Scheduled" });
    res.json({ message: "Patient checked in" });
  } catch (error) {
    res.status(500).json({ message: "Failed to check-in patient" });
  }
};
