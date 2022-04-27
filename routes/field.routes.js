const express=require('express');

const router=express.Router();
const fieldController= require('../controllers/field.controllers');
router.post('/create',fieldController.create);
router.get('/findfield',fieldController.findAllField);
router.get('/:id',fieldController.findById);
router.delete('/:id',fieldController.delete);
router.put('/:id',fieldController.update);



module.exports=router;