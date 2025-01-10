const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 3,
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function (value) {
        return value === this.password; // Checks if confirmPassword matches password
      },
      message: "Passwords do not match",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets to the current date
  },
});

// Before saving, remove the confirmPassword field from the data
registrationSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

module.exports = mongoose.model("User", registrationSchema);
