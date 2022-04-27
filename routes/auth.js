const router= require('express').Router()
const authctr=require('../controllers/auth.controllers')
router.post('/register',authctr.register); 
router.post('/login',authctr.login);
router.get('/verify-email',authctr.verification)
module.exports=router
