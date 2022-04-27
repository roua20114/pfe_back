const express=require('express');
const router= express.Router();
const questionCtr=require('../controllers/questions.controllers');
router.post('/add',questionCtr.add);
router.get('/getAll',questionCtr.findAllquestions);
router.get('/:id',questionCtr.findById);
router.delete('/:id',questionCtr.delete);
router.put('/:id',questionCtr.update);

module.exports=router;