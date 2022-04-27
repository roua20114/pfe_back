const express=require('express');

const router=express.Router();
const resCtr= require('../controllers/companyRes.controllers');
router.post('/create',resCtr.add);
router.get('/find',resCtr.findAllres);
router.get('/:id',resCtr.findById);
router.delete('/:id',resCtr.delete);
router.put('/:id',resCtr.update);



module.exports=router;