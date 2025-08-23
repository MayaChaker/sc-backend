const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MedicalRecordFile = sequelize.define(
  "MedicalRecordFile",
  {
    medical_record_file_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "medical_records",
        key: "record_id",
      },
    },
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "files",
        key: "file_id",
      },
    },
  },
  {
    tableName: "medical_records_files",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = MedicalRecordFile;
