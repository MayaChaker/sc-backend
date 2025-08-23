const File = require("../Models/filesModel");

const createFile = async (req, res) => {
  try {
    const { title, location, url, type } = req.body;
    const newFile = await File.create({
      title,
      location,
      url,
      type,
    });
    res.status(201).json(newFile);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to create file" });
  }
};
const updateFile = async (req, res) => {
  try {
    const { file_id } = req.params;
    const file = await File.findByPk(file_id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    await file.update(req.body);
    res.status(200).json(file);
  } catch (error) {
    console.error("UpdateFile error:", error);
    res.status(500).json({ error: "Failed to update file" });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const files = await File.findAll();
    res.status(200).json(files);
  } catch (error) {
    console.error("Error files", error);
    res.status(500).json({ error: "failed retreive files" });
  }
};

const getFileById = async (req, res) => {
  try {
    const { file_id } = req.params;
    const file = await File.findByPk(file_id);
    if (!file) {
      return res.status(404).json({ message: "File not found." });
    }
    res.status(200).json(file);
  } catch (error) {
    console.error({ message: "Error finding file", error });
    res.status(500).json({ error: "Failed to retreive file" });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { file_id } = req.params;
    const deleted = await File.destroy({ where: { file_id } });
    if (!deleted) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json({ message: "File deleted " });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Failed to delete file " });
  }
};
module.exports = {
  createFile,
  getFileById,
  getAllFiles,
  deleteFile,
  updateFile,
};
