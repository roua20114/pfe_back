const express = require("express");


const route = express.Router()
const auth = require('./verifyToken')
const useController = require('../controllers/user.controllers');
const router = require("./auth");

route.get('/me' ,  useController.myprofile )
route.get('/myprofile',useController.myprofileCompany)
route.put('/increment/:id',useController.visited)
route.get('/mostvisited' , useController.getMostVisitedProfiles)
route.put('/:id',useController.editProfileCompany)
router.put('can/:id',useController.editProfileCandidat)
router.delete('/id',useController.deleteCompany)
router.delete('candidat/:id',useController.deleteCandidat)

module.exports=route;