const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/',authMiddleware.authenticate, authController.getAllUsers);
router.get('/:id',authMiddleware.authenticate, authController.getUserById);
router.delete('/:id',authMiddleware.authenticate,  authController.deleteUser);
module.exports = router;
