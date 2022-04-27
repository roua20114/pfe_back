const express=require('express');

const router=express.Router();
const cvCtr= require('../controllers/cv.controllers');
router.post('/create',cvCtr.add);
router.get('/find',cvCtr.findAllcv);
router.get('/:id',cvCtr.findById);
router.delete('/:id',cvCtr.delete);
router.put('/:id',cvCtr.update);



module.exports=router;