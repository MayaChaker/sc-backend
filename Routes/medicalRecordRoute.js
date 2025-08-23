const express = require("express");
const router = express.Router();

const {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  DeleteRecord,
} = require("../Controllers/medicalRecordController");
router.get("/", getAllRecords);
router.get("/:record_id", getRecordById);
router.post("/", createRecord);
router.put("/:record_id", updateRecord);
router.delete("/:record_id", DeleteRecord);
module.exports = router;
