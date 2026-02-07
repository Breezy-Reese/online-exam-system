const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() { return this.provider === 'local'; } },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  provider: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
  providerId: { type: String },
  profilePicture: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
