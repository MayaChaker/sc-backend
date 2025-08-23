const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../Controllers/appointmentController.js");
router.get("/", getAllAppointments);
router.get("/:appointment_id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:appointment_id", updateAppointment);
router.delete("/:appointment_id", deleteAppointment);
module.exports = router;
