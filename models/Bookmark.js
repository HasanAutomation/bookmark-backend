const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a bookmark title'],
      unique: true,
    },
    link: {
      type: String,
      required: [true, 'Please add a bookmark link'],
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);
module.exports = Bookmark;
