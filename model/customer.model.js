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
    unique: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  signUpDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

const Customer = mongoose.model("customer", customerSchema);
export default Customer;
