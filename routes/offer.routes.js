const express=require('express');
const router= express.Router();
const multipart = require('connect-multiparty');
// const md_upload = multipart({uploadDir: './uploads/publications'});
const verify=require('../routes/verifyToken')

const offerCtr=require('../controllers/jobOffer.controllers');
router.post('/addOffer',verify.verifyToken,offerCtr.add);
router.get('/getAll',offerCtr.findAllOffers);
router.get('/:id',offerCtr.findById);
router.get('/search/:key',offerCtr.getbyname)


router.delete('/:id',offerCtr.delete);
router.put('/:id',offerCtr.update);


module.exports=router;