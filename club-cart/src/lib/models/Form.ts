import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  link: { type: String, required: true },
});

export default (mongoose.models.Form
  ? mongoose.models.Form
  : mongoose.model("Form", formSchema)) as any;
