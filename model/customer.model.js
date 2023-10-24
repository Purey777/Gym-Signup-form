import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
    default: "Abc#123",
    trim: true,
    minLength: 6,
  },
  signUpDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

customerSchema.pre("save", async () => {
  const user = this;
  const hashedPassword = await bcrypt.hash(user["password"], 10);
  user["password"] = hashedPassword;
});

const Customer = mongoose.model("customer", customerSchema);
export default Customer;
