const express=require('express');
const router= express.Router();

const middleware=require('../middleware/fileUpload')
const verifyToken=require("../routes/verifyToken")
const offerCtr=require('../controllers/jobOffer.controllers');
router.post('/addOffer',offerCtr.add,middleware.upload.single('file'));
router.get('/getAll',offerCtr.findAllOffers);
router.get('/:id',offerCtr.findById);
router.delete('/:id',verifyToken.verifyToken,offerCtr.delete);
router.put('/:id',offerCtr.update);


module.exports=router;