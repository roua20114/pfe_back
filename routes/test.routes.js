const express= require('express');
const testCtr= require('../controllers/test.controllers');
const router=express.Router();
router.post('/addtest', testCtr.add);
router.get('/getalltest',testCtr.findAlltest);
router.get('/:id',testCtr.findById);
router.delete('/:id',testCtr.delete);
router.put('/:id', testCtr.update);
module.exports=router;