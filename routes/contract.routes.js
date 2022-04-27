const express=require('express');

const router=express.Router();
const contractCtr= require('../controllers/contactType.controllers');
router.post('/create',contractCtr.add);
router.get('/find',contractCtr.findAllContracts);
router.get('/:id',contractCtr.findById);
router.delete('/:id',contractCtr.delete);
router.put('/:id',contractCtr.update);



module.exports=router;