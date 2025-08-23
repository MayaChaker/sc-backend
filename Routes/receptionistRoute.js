const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Appointment = require("../Models/appointmentModel");
const User = require("../Models/userModel");

router.post("/appointment", auth, async (req, res) => {
  if (req.user.role !== "Receptionist") {
    return res
      .status(401)
      .json({ message: "only receptionist can create appointments" });
  }
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment" });
  }
});
router.delete("/appointment/:id", auth, async (req, res) => {
  if (req.usser.role !== "Receptionist") {
    return res
      .status(401)
      .json({ message: "only receptionist can appointment" });
  }
  try {
    const deleted = await Appointment.destroy({
      where: { appointment_id: req.params.id },
    });
    if (!deleted)
      return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel appointment" });
  }
});

router.put("/appointment/:id", auth, async (req, res) => {
  if (req.user.role !== "Receptionist") {
    return res
      .status(401)
      .json({ message: "only receptionist can update appointment" });
  }
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await appointment.update(req.body);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment" });
  }
});

router.post("/patients", auth, async (req, res) => {
  if (req.user.role !== "Receptionist") {
    return res
      .status(403)
      .json({ message: "Only Receptionist can add patients" });
  }
  try {
    const {
      first_name,
      last_name,
      username,
      password,
      dob,
      gender,
      contact_number,
      address,
    } = req.body;

    const newPatient = await User.create({
      first_name,
      last_name,
      username,
      password,
      role: "Patient",
      dob,
      gender,
      contact_number,
      address,
    });
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: "Failed to create patient" });
  }

  router.patch("/checkin/:id", auth, async (req, res) => {
    if (req.user.role !== "Receptionist") {
      return res
        .status(401)
        .json({ message: "only receptionist can check-in patients" });
    }
    try {
      const appointment = await Appointment.findByPk(req.params.id);
      if (!appointment) {
        return res.status(401).json({ message: "Appointment not found" });
      }
      await appointment.update({ status: "Scheduled" });
      res.json({ message: "Patient checked in" });
    } catch (error) {
      res.status(500).json({ message: "Failed to check-in patient" });
    }
  });
});
module.exports = router;
