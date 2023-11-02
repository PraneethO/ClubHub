import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  schoolCode: { type: String, required: true },
  schoolZip: { type: String, required: true },
});

export default (mongoose.models.School
  ? mongoose.models.School
  : mongoose.model("School", schoolSchema)) as any;
