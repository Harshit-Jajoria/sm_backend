import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    picturePath: {
      type: String,
      default: '',
    },
    friends: {
      type: Array,
      default: [],
    },
    linkedIn: {
      type: String,
      min: 3,
      max: 50,
      default: '',
    },
    github: {
      type: String,
      min: 3,
      max: 50,
      default: '',
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impression: Number,
  },
  { timestamps: true }
);
const User = mongoose.model('User', UserSchema);
export default User; // bhai -- UserModel -User
