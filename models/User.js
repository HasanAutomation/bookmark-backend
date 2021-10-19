const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      max: [15, 'Name should be max 15 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email id',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      min: [8, 'Password must be at least 8 characters'],
      // select: false,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password should contain at least one uppercase,one lowercase and a special character',
      ],
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

UserSchema.virtual('bookmarks', {
  localField: '_id',
  foreignField: 'user',
  justOne: false,
  ref: 'Bookmark',
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Cascade delete for bookmarks
UserSchema.pre('remove', async function (next) {
  await this.model('Bookmark').deleteMany({ user: this._id });
  next();
});

module.exports = mongoose.model('User', UserSchema);
