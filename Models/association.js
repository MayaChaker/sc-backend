const MedicalRecord = require("./medicalRecordModel");
const User = require("./userModel");
const MedicalRecordFile = require("./medicalRecordFileModel");
const File = require("./filesModel");
const Message = require("./messageModel");
const Schedule = require("./scheduleModel");
const Section = require("./sectionModel");
const Appointment = require("./appointmentModel");
const Address = require("./addressModel");

MedicalRecord.belongsTo(User, { as: "DoctorUser", foreignKey: "doctor" });
MedicalRecord.belongsTo(User, { as: "PatientUser", foreignKey: "patient" });
MedicalRecord.belongsTo(User, { as: "Submitter", foreignKey: "submitted_by" });
MedicalRecord.hasMany(MedicalRecordFile, {
  foreignKey: "record_id",
  as: "files",
});

MedicalRecordFile.belongsTo(MedicalRecord, {
  foreignKey: "record_id",
  as: "medical_record",
});
MedicalRecordFile.belongsTo(File, {
  foreignKey: "file_id",
  as: "file",
});

File.hasMany(MedicalRecordFile, {
  foreignKey: "file_id",
  as: "records",
});

Message.belongsTo(User, { foreignKey: "sender", as: "senderData" });
Message.belongsTo(User, { foreignKey: "receiver", as: "receiverData" });

Schedule.belongsTo(User, { foreignKey: "doctor", as: "doctorData" });

User.hasMany(Schedule, {
  foreignKey: "doctor",
  as: "schedules",
});

Section.hasMany(User, {
  foreignKey: "section_id",
  as: "users",
});
User.belongsTo(Section, { foreignKey: "section_id", as: "section" });

Appointment.belongsTo(User, { foreignKey: "doctor", as: "doctorData" });
Appointment.belongsTo(User, { foreignKey: "patient", as: "patientData" });

User.hasMany(Address, { foreignKey: "user_id" });
Address.belongsTo(User, { foreignKey: "user_id", as: "userData" });
