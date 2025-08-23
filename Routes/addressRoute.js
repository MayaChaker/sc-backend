const express = require("express");
const router = express.Router();
const {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("../Controllers/addressController");
router.get("/", getAllAddresses);
router.get("/:address_id", getAddressById);
router.post("/", createAddress);
router.put("/:address_id", updateAddress);
router.delete("/:address_id", deleteAddress);
module.exports = router;
