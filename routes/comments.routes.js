const express=require('express')
const router=express.Router();
const comController = require('../controllers/comments.controllers')
router.post('/createcom',comController.createCom);
router.get('/comments',comController.findAllComs);
router.get('/:id',comController.findById);
router.delete('/:id',comController.delete);
router.put('/:id',comController.update);
module.exports=router;