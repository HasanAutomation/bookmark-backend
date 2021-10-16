const {
  createBookmark,
  getBookmark,
  updateBookmark,
  deleteBookmark,
  getBookmarks,
} = require('../controllers/bookmark');

const router = require('express').Router();

router.route('/').post(createBookmark).get(getBookmarks);
router
  .route('/:id')
  .get(getBookmark)
  .put(updateBookmark)
  .delete(deleteBookmark);

module.exports = router;
