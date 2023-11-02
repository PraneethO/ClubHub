import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  school: { type: String, required: true },
  sponsorName: { type: String, required: true },

  meetingDay: { type: String, default: "" },

  studentList: [{ type: String, default: [] }],
  paidStudentList: [{ type: String, default: [] }],
  fees: { type: Number, default: 0 },
  description: { type: String, default: "" },
  forms: [{ type: String, default: [] }],
  picture: { type: String },

  completedSetup: { type: Boolean, default: false },
  completedBank: { type: Boolean, default: false },
});

export default (mongoose.models.Club
  ? mongoose.models.Club
  : mongoose.model("Club", clubSchema)) as any;
