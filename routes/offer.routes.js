const express=require('express');
const router= express.Router();
const multer=require('multer')
const upload=multer({dest:'uploads/'})
const verifyToken=require("../routes/verifyToken")
const offerCtr=require('../controllers/jobOffer.controllers');
router.post('/addOffer',offerCtr.add);
router.get('/getAll',offerCtr.findAllOffers);
router.get('/:id',offerCtr.findById);
router.delete('/:id',verifyToken.verifyToken,offerCtr.delete);
router.put('/:id',verifyToken.verifyToken,offerCtr.update);

module.exports=router;