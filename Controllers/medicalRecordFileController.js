const MedicalRecordFile = require("../Models/medicalRecordFileModel");
const MedicalRecord = require("../Models/medicalRecordModel");
const File = require("../Models/filesModel");

const createMedicalRecordFile = async (req, res) => {
  try {
    const { record_id, file_id } = req.body;

    const newRecordFile = await MedicalRecordFile.create({
      record_id,
      file_id,
    });
    res.status(201).json(newRecordFile);
  } catch (error) {
    console.error("createMedicalFile error:", error);
    res.status(500).json({ message: "Failed to create Medical Record" });
  }
};

const getMedicalRecordFileById = async (req, res) => {
  try {
    const { medical_record_file_id } = req.params;
    const medicalRecords = await MedicalRecordFile.findByPk(
      medical_record_file_id,
      {
        include: [
          { model: MedicalRecord, as: "medical_record" },
          { model: File, as: "file" },
        ],
      }
    );
    if (!medicalRecords) {
      return res.status(404).json({ message: "medical record not found" });
    }
    res.status(200).json(medicalRecords);
  } catch (error) {
    console.error("error fetching ", error);
    res
      .status(500)
      .json({ message: "medical info couldn't be retrieved at the moment" });
  }
};

const getAllMedicalRecordFile = async (req, res) => {
  try {
    const recordFile = await MedicalRecordFile.findAll({
      include: [
        { model: MedicalRecord, as: "medical_record" },
        { model: File, as: "file" },
      ],
    });
    if (!recordFile) {
      return res.status(404).json({ message: "medical records not found" });
    }
    res.status(200).json(recordFile);
  } catch (error) {
    console.error("error fetching records", error);
    res.status(500).json({ message: "Failed to retrieve medical records" });
  }
};
const updateMedicalRecordFile = async (req, res) => {
  try {
    const { medical_record_file_id } = req.params;
    const { record_id, file_id } = req.body;

    const update = await MedicalRecordFile.findByPk(medical_record_file_id);
    if (!update) {
      return res.status(404).json({ message: "medical record not updated" });
    }
    update.record_id = record_id;
    update.file_id = file_id;
    await update.save();
    res.status(200).json(update);
  } catch (error) {
    console.error("updateMedicalRecordFile error", error);
    res.status(500).json({ error: "Failed to update medical record" });
  }
};
const deleteMedicalRecordFile = async (req, res) => {
  try {
    const { medical_record_file_id } = req.params;
    const deleted = await MedicalRecordFile.destroy({
      where: { medical_record_file_id },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "delete succesfully" });
  } catch (error) {
    console.error("Error deleting", error);
    res.status(500).json({ error: "Failed to delete medical record" });
  }
};
module.exports = {
  createMedicalRecordFile,
  getAllMedicalRecordFile,
  getMedicalRecordFileById,
  updateMedicalRecordFile,
  deleteMedicalRecordFile,
};
