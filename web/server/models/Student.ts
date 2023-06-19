import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  school: { type: String, required: true },
  region: { type: String },
  grade: { type: Number, required: true },
  experience: { type: String },

  resume: { type: Number },
  images: [{ type: Number }], // 1st is profile, 2-5 are other images

  interested: [{ type: String }],
  applied: [{ type: String }],
  recent: [{ type: String }],
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
