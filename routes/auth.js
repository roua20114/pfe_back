const router= require('express').Router()
const authctr=require('../controllers/auth.controllers');

router.post('/register',authctr.register); 
router.post('/login',authctr.login);
router.get('/verify-email',authctr.verification)
router.get('/forgot',authctr.forgetPassword)
router.get('/reset/:id',authctr.resetPassword)
router.get('/logout',authctr.logout)
module.exports=router
