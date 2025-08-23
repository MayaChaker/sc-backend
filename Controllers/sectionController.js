const express = require("express");
const { Section, User } = require("../Models");

const getAllSection = async (req, res) => {
  try {
    const sections = await Section.findAll({
      include: [
        {
          model: User,
          as: "users",
          where: { role: "Doctor" },
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "role",
            "specialization",
          ],
          required: false,
        },
      ],
    });
    res.status(200).json(sections);
  } catch (error) {
    console.error("getAllSection:", error);
    res.status(500).json({ error: "Failed to retrieve sections" });
  }
};
const getSectionById = async (req, res) => {
  try {
    const { section_id } = req.params;
    const section = await Section.findByPk(section_id, {
      include: [
        {
          model: User,
          as: "users",
          where: { role: "Doctor" },
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "role",
            "specialization",
          ],
        },
      ],
    });

    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    res.status(200).json(section);
  } catch (error) {
    console.error("getSectionById error:", error);
    res.status(500).json({ error: "Failed to retrieve  section" });
  }
};
const createSection = async (req, res) => {
  try {
    const { title } = req.body;
    const section = await Section.create({ title });
    res.status(201).json(section);
  } catch (error) {
    console.error("createSection error:", error);
    res.status(500).json({ error: "Failed to create section" });
  }
};
const updateSection = async (req, res) => {
  try {
    const { section_id } = req.params;
    const { title } = req.body;

    const section = await Section.findByPk(section_id);
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    section.title = title;
    await section.save();
    res.status(200).json(section);
  } catch (error) {
    console.error("updateSection error:", error);
    res.status(500).json({ error: "Failed to update section" });
  }
};
const deleteSection = async (req, res) => {
  try {
    const { section_id } = req.params;

    const section = await Section.findByPk(section_id);
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    await section.destroy();
    res.status(200).send();
  } catch (error) {
    console.error("deleteSection section:", error);
    res.status(500).json({ error: "Failed to delete section" });
  }
};

module.exports = {
  getAllSection,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
};
