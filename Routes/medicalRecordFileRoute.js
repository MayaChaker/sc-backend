const express = require("express");
const router = express.Router();
const {
  createMedicalRecordFile,
  getAllMedicalRecordFile,
  getMedicalRecordFileById,
  updateMedicalRecordFile,
  deleteMedicalRecordFile,
} = require("../Controllers/medicalRecordFileController");

router.get("/", getAllMedicalRecordFile);
router.get("/:medical_record_file_id", getMedicalRecordFileById);
router.post("/", createMedicalRecordFile);
router.put("/:medical_record_file_id", updateMedicalRecordFile);
router.delete("/:medical_record_file_id", deleteMedicalRecordFile);
module.exports = router;
