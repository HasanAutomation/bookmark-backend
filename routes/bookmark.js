const {
  createBookmark,
  getBookmark,
  updateBookmark,
  deleteBookmark,
  getBookmarks,
} = require('../controllers/bookmark');
const auth = require('../middleware/auth');

const router = require('express').Router();

router.route('/').post(auth, createBookmark).get(auth, getBookmarks);
router
  .route('/:id')
  .get(auth, getBookmark)
  .put(auth, updateBookmark)
  .delete(auth, deleteBookmark);

module.exports = router;
