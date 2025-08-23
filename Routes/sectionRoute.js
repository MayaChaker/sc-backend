const express = require("express");
const router = express.Router();

const {
  getAllSection,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
} = require("../Controllers/sectionController.js");
router.get("/", getAllSection);
router.get("/:section_id", getSectionById);
router.post("/", createSection);
router.put("/:section_id", updateSection);
router.delete("/:section_id", deleteSection);
module.exports = router;
