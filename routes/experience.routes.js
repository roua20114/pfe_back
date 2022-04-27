const express=require('express');

const router=express.Router();
const expCtr= require('../controllers/experience.controllers');
router.post('/create',expCtr.add);
router.get('/findexp',expCtr.findAllExp);
router.get('/:id',expCtr.findById);
router.delete('/:id',expCtr.delete);
router.put('/:id',expCtr.update);



module.exports=router;