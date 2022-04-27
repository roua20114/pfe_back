const express=require('express');

const router=express.Router();
const canCtr= require('../controllers/candidacy.controllers');
router.post('/create',canCtr.add);
router.get('/find',canCtr.findAllCandadicies);
router.get('/:id',canCtr.findById);
router.delete('/:id',canCtr.delete);




module.exports=router;