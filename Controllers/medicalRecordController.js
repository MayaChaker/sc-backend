const MedicalRecord = require("../Models/medicalRecordModel");
const User = require("../Models/userModel");

const createRecord = async (req, res) => {
  try {
    const { type, title, doctor, patient, submitted_by } = req.body;

    const newRecord = await MedicalRecord.create({
      type,
      title,
      doctor,
      patient,
      submitted_by,
    });
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("createRecord error:", error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.findAll({
      attributes: [
        "record_id",
        "type",
        "title",
        "doctor",
        "patient",
        "submitted_by",
        "created_at",
      ],
    });
    res.status(200).json(records);
  } catch (error) {
    console.error("getAllRecord error:", error);
    res.status(500).json({ error: "Failed to retreive redcords" });
  }
};

const getRecordById = async (req, res) => {
  try {
    const { record_id } = req.params;
    const record = await MedicalRecord.findByPk(record_id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    console.error("getRecord errror:", error);
    res.status(500).json({ error: "Failed to retreive record " });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { record_id } = req.params;
    const updated = await MedicalRecord.update(req.body, {
      where: { record_id },
    });
    res.status(200).json(updated);
  } catch (error) {
    console.error("updateRecord error:", error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

const DeleteRecord = async (req, res) => {
  try {
    const { record_id } = req.params;
    const deleted = await MedicalRecord.findByPk(record_id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    await deleted.destroy();
    res.status(200).json({ message: "Record deleted" });
  } catch (error) {
    console.error("deleteRecord:", error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  DeleteRecord,
};
