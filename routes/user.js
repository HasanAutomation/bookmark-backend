const { registerUser, loginUser, currentUser } = require('../controllers/user');
const auth = require('../middleware/auth');

const router = require('express').Router();

router.route('/').post(registerUser);
router.post('/login', loginUser);
router.get('/me', auth, currentUser);

module.exports = router;
