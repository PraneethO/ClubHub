import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  school: { type: String, required: true },
  clubs: [{ type: String, default: [] }],

  cart: [{ type: String, default: [] }],
});

export default (mongoose.models.Student
  ? mongoose.models.Student
  : mongoose.model("Student", studentSchema)) as any;
