const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Role = require("../middleware/roleMiddleware");
const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  createPatient,
  checkIn,
} = require("../Controllers/receptionistController");

router.use(auth, Role("Receptionist"));
router.post("/appointment", createAppointment);
router.delete("/appointment/:id", deleteAppointment);
router.put("/appointment/:id", updateAppointment);
router.post("/patients", createPatient);
router.patch("/checkin/:id", checkIn);

module.exports = router;
