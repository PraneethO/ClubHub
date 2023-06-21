import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  state: { type: String, required: true },
  field: { type: String, required: true },
  designation: { type: String, required: true },

  school: { type: String },
  leaders: [{ type: String }],

  // Images
  images: [{ type: Number }],

  // Not Required --> Clubs setup later in profile --> Power Ranking
  numStudents: { type: Number },
  numDistricts: { type: Number },
  numLeaders: { type: Number },
  numPositions: { type: Number },
  numApplicants: { type: Number },
  power: { type: Number },

  // Not Required --> Clubs setup later in profile --> Positions they're looking for
  positions: [{ type: String }],
});

export default mongoose.model("Organization", organizationSchema);
