import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Manager', 'Developer', 'Designer', 'HR', 'Intern', 'Other'],
    default: 'Other'
  },
  department: {
    type: String,
    default: 'General'
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }
}
)

export const Employee = mongoose.model('Employees', employeeSchema);