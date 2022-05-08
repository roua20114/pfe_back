const express=require('express');
const router=express.Router();
const candidatCtr=require('../controllers/candidat.controllers');



router.get("/getall",candidatCtr.getall)

router.get("/getbyid/:id",candidatCtr.getbyid)
router.get("/getbyname",candidatCtr.getbyname)
router.put("/update/:id",candidatCtr.update)
router.delete("/delete/:id",candidatCtr.delete)
module.exports=router
