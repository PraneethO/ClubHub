import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  orgName: { type: String, required: true },
  orgId: { type: String, rquired: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  message: { type: String, required: true },
  // The user id of the people who applied
  applied: [{ type: String }],
  school: { type: String },
  city: { type: String },
  field: { type: String },
});

export default mongoose.model("Position", positionSchema);
