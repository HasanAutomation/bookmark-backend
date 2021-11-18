const asyncHandler = require('../middleware/async');
const Bookmark = require('../models/Bookmark');
const ErrorResponse = require('../utils/errorResponse');

// @POST api/v1/bookmarks
// @desc Create a bookmark
// @access private
exports.createBookmark = asyncHandler(async (req, res, next) => {
  req.body.user = req.user;
  const bookmark = await Bookmark.create(req.body);
  res.status(201).json({
    success: true,
    data: bookmark,
  });
});

// @GET api/v1/bookmarks/
// @desc Get all bookmarks
// @access private
exports.getBookmarks = asyncHandler(async (req, res, next) => {
  let query;

  query = Bookmark.find({ user: req.user });

  let pagination = {};
  let count;

  if (req.query.name) {
    query = query.find({
      user: req.user,
      title: { $regex: req.query.name, $options: 'i' },
    });
    count = await Bookmark.find({
      user: req.user,
      title: { $regex: req.query.name, $options: 'i' },
    });
  } else {
    count = await Bookmark.find({ user: req.user });
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 8;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  pagination.current = {
    page,
  };

  if (endIndex < count.length) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  query = query.skip(startIndex).limit(limit).sort({ createdAt: -1 });

  const bookmarks = await query;

  res.status(200).json({
    success: true,
    count: bookmarks.length,
    pagination,
    data: bookmarks,
  });
});

// @GET api/v1/bookmarks/:id
// @desc Get a bookmark
// @access private
exports.getBookmark = asyncHandler(async (req, res, next) => {
  const bookmark = await Bookmark.findById(req.params.id);
  if (!bookmark)
    return next(
      new ErrorResponse(404, `No bookmark found with id ${req.params.id}`)
    );
  res.status(200).json({
    success: true,
    data: bookmark,
  });
});

// @PUT api/v1/bookmarks/:id
// @desc Update a bookmark
// @access private
exports.updateBookmark = asyncHandler(async (req, res, next) => {
  const bookmark = await Bookmark.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!bookmark)
    return next(
      new ErrorResponse(404, `No bookmark found with id ${req.params.id}`)
    );
  res.status(200).json({
    success: true,
    data: bookmark,
  });
});

// @DELETE api/v1/bookmarks/:id
// @desc Delete a bookmark
// @access private
exports.deleteBookmark = asyncHandler(async (req, res, next) => {
  const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
  if (!bookmark)
    return next(
      new ErrorResponse(404, `No bookmark found with id ${req.params.id}`)
    );
  res.status(200).json({
    success: true,
    data: null,
  });
});
