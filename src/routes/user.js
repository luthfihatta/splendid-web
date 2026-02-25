const express = require('express');
const UserController = require('../controller/user');
const router = express.Router();

// READ
router.get('/', UserController.getAllUser);

// CREATE
router.post('/', UserController.createNewUser);

// UPDATE
router.patch('/:idUser', UserController.updateUser);

// DELETE
router.delete('/:idUser', UserController.deleteUser);

module.exports = router;