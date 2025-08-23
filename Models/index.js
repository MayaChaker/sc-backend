const MedicalRecord = require("./medicalRecordModel");
const User = require("./userModel");
const MedicalRecordFile = require("./medicalRecordFileModel");
const File = require("./filesModel");
const Message = require("./messageModel");
const Schedule = require("./scheduleModel");
const Section = require("./sectionModel");
const Appointment = require("./appointmentModel");
const Address = require("./addressModel");

require("./association");

module.exports = {
  User,
  MedicalRecord,
  MedicalRecordFile,
  File,
  Message,
  Schedule,
  Section,
  Appointment,
  Address,
};
