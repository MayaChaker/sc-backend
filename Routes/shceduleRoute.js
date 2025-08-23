const express = require("express");
const router = express.Router();
const {
  getAllSchedule,
  getScheduleById,
  getDoctorSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../Controllers/scheduleController");

router.get("/doctor/:user_id", getDoctorSchedules);
router.get("/", getAllSchedule);
router.get("/:schedule_id", getScheduleById);
router.post("/", createSchedule);
router.put("/:schedule_id", updateSchedule);
router.delete("/:schedule_id", deleteSchedule);
module.exports = router;
