const express= require("express")
const router= express.Router();
const msgCtr=require("../controllers/msg.controllers")
router.post('/add',msgCtr.add);
router.get('/allMsg',msgCtr.findAllmsgs);
router.get('/:id',msgCtr.findById);
router.delete('/:id',msgCtr.delete)
module.exports=router;