const express = require("express");
const Schedule = require("../Models/scheduleModel");
const User = require("../Models/userModel");

const getAllSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findAll({
      include: [
        {
          model: User,
          as: "doctorData",
        },
      ],
    });
    res.status(200).json(schedule);
  } catch (error) {
    console.log("Error fetching schedule: ", error);
    res.status(500).json({ error: "Failed to retrieve Schedules" });
  }
};

const getScheduleById = async (req, res) => {
  try {
    const { schedule_id } = req.params;
    const schedule = await Schedule.findByPk(schedule_id, {
      include: [
        {
          model: User,
          as: "doctorData",
        },
      ],
    });
    if (!schedule) {
      return res.status(404).json({ error: "schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    console.error("ScheduleById error: ", error);
    res.status(500).json({ error: "Failed to retrieve schedule" });
  }
};
const createSchedule = async (req, res) => {
  try {
    const { date, time, available_from, available_to, doctor } = req.body;
    if (!date || !available_from || !available_to || !doctor) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const freeDoctor = await User.findByPk(doctor);
    if (!freeDoctor || freeDoctor.role !== "doctor") {
      return res.status(404).json({ error: "Doctor not found" });
    }
    const newSchedule = await Schedule.create({
      date,
      time,
      available_from,
      available_to,
      doctor,
    });
    res.status(201).json(newSchedule);
  } catch (error) {
    console.log("createSchedule error", error);
    res.status(500).json({ error: "Failed to create schedule" });
  }
};
const getDoctorSchedules = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    if (!user || user.role !== "doctor") {
      return res.status(404).json({ error: "Doctor not found" });
    }
    const schedules = await Schedule.findAll({
      where: { doctor: user_id },
      order: [["date", "ASC"]],
    });
    res.status(200).json(schedules);
    console.log("schedules:", schedules);
  } catch (error) {
    console.error("getDocotrSchedules error: ", error);
    res.status(500).json({ error: "Failed to retrieve doctor Schedules" });
  }
};
const updateSchedule = async (req, res) => {
  try {
    const { schedule_id } = req.params;

    const { date, time, available_from, available_to } = req.body;
    const schedule = await Schedule.findByPk(schedule_id);
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    schedule.date = date;
    schedule.available_from = available_from;
    schedule.available_to = available_to;
    schedule.time = time;
    await schedule.save();
    res.status(200).json(schedule);
  } catch (error) {
    console.error("updateSchedule error:", error);

    res.status(500).json({ error: "Failed to update doctor schedule" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { schedule_id } = req.params;
    const schedule = await Schedule.findByPk(schedule_id);
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    await schedule.destroy();
    res.status(200).json({ message: "Schedule deleted" });
  } catch (error) {
    console.error("deleteSchedule error:", error);
    res.status(500).json({ error: "Failed to delete schedule" });
  }
};
module.exports = {
  getAllSchedule,
  getScheduleById,
  getDoctorSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
