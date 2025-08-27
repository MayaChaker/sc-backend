const express = require("express");
const cors = require("cors");
const UserRoute = require("./Routes/UserRoute");
const sectionRoute = require("./Routes/sectionRoute");
const addressRoute = require("./Routes/addressRoute");
const appointmentRoute = require("./Routes/appointmentRoute");
const messageRoute = require("./Routes/messageRoute");
const scheduleRoute = require("./Routes/shceduleRoute");
const medicalRecordRoute = require("./Routes/medicalRecordRoute");
const medicalRecordFileRoute = require("./Routes/medicalRecordFileRoute");
const filesRoute = require("./Routes/filesRoute");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/files", filesRoute);
app.use("/medical_record_file", medicalRecordFileRoute);
app.use("/medical_record", medicalRecordRoute);
app.use("/schedule", scheduleRoute);
app.use("/users", UserRoute);
app.use("/section", sectionRoute);
app.use("/address", addressRoute);
app.use("/appointment", appointmentRoute);
app.use("/message", messageRoute);
app.listen(5000, () => {
  console.log("running on port 5000");
});
app.get("/", (req, res) => {
  res.send("Server is working!");
});
