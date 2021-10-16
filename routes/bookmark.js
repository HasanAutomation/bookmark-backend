const {
  createBookmark,
  getBookmark,
  updateBookmark,
  deleteBookmark,
} = require('../controllers/bookmark');

const router = require('express').Router();

router.route('/').post(createBookmark);
router
  .route('/:id')
  .get(getBookmark)
  .put(updateBookmark)
  .delete(deleteBookmark);

module.exports = router;
