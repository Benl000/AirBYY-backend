const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, updateUser} = require('./user.controller')
const router = express.Router()

// user router

router.get('/',getUsers)
router.get('/:id',getUser)
router.put('/:id',  updateUser)
// if we get the point that we have user admin
router.delete('/:id',  requireAuth, requireAdmin, deleteUser)

module.exports = router