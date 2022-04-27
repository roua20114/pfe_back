const express = require("express");


const route = express.Router()
const auth = require('./verifyToken')
const useController = require('../controllers/user.controllers')

route.get('/me' ,auth.auth ,  useController.myprofile )
route.put('/:id',useController.editProfile)
module.exports=route;