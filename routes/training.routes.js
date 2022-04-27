const express=require('express');
const trainingCtr=require("../controllers/training.controllers");
const router= express.Router();
router.post('/add',trainingCtr.add);
router.get('/allTr',trainingCtr.findAlltraining);
router.get('/:id',trainingCtr.findById);
router.delete('/:id',trainingCtr.delete);
router.put('/:id', trainingCtr.update);
module.exports=router;