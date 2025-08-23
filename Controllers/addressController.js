const express = require("express");
const Address = require("../Models/addressModel");
const User = require("../Models/userModel");

const getAllAddresses = async (req, res) => {
  try {
    const address = await Address.findAll({
      include: {
        model: User,
        as: "userData",
        attributes: ["user_id", "first_name", "last_name"],
      },
    });
    res.status(200).json(address);
  } catch (error) {
    console.error("getAllAddress error", error);
    res.status(500).json({ error: "Failed to retreive addresses" });
  }
};

const getAddressById = async (req, res) => {
  try {
    const { address_id } = req.params;
    const address = await Address.findByPk(address_id);
    if (!address) return res.status(404).json({ error: "Address not found" });
    res.status(200).json(address);
  } catch (error) {
    console.error("getAddressById error", error);
    res.status(500).json({ error: "Failed to retreive address" });
  }
};

const createAddress = async (req, res) => {
  try {
    const { city, street, building, floor, post_code, user_id } = req.body;
    const newAddress = await Address.create({
      city,
      street,
      building,
      floor,
      post_code,
      user_id,
    });
    res.status(201).json(newAddress);
  } catch (error) {
    console.error("createAddress error", error);
    res.status(500).json({ error: "Failed to create address" });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { address_id } = req.params;
    const address = await Address.findByPk(address_id);
    if (!address) return res.status(404).json({ error: "Address not found" });
    await address.update(req.body);
    res.status(200).json(address);
  } catch (error) {
    console.error("updateAddress error", error);
    res.status(500).json({ error: "Failed to update address" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { address_id } = req.params;
    const address = await Address.findByPk(address_id);
    if (!address) return res.status(404).json({ error: "Address not found" });
    await address.destroy();
    res.status(200).send();
  } catch (error) {
    console.error("deleteAddress error", error);
    res.status(500).json({ error: "Failed to delete address" });
  }
};

module.exports = {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
};
