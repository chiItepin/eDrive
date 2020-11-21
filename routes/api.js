const express = require ('express');
const router = express.Router();
const userController = require('../controllers/user');
const fileController = require('../controllers/file');
const auth = require('../middleware/auth');

// For file uploading
const multer  = require('multer')
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// GET - Get all users
router.get('/users', auth, userController.getUsers);

// POST - Create new User/Sign Up
router.post('/users', userController.create);

// POST - Authenticate user/login
router.post('/authenticate/user', userController.authenticate);

// POST - Store new file
router.post('/files', upload.single("file"), auth, fileController.create);

module.exports = router;