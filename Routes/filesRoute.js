const express = require("express");
const router = express.Router();

const {
  createFile,
  getFileById,
  getAllFiles,
  deleteFile,
  updateFile,
} = require("../Controllers/filesController");

router.get("/", getAllFiles);
router.get("/:file_id", getFileById);
router.post("/", createFile);
router.delete("/:file_id", deleteFile);
router.put("/:file_id", updateFile);

module.exports = router;
