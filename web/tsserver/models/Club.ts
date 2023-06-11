import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  zip: { type: Number, required: true },
  industry: { type: String, required: true },
  school: { type: String, required: true },
  leaders: [{ type: String, required: true }],

  // Not Required --> Clubs setup later in profile --> Power Ranking
  numStudents: { type: Number },
  numDistricts: { type: Number },
  numLeaders: { type: Number },
});

export default mongoose.model("Club", clubSchema);
