const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.models')
const nodemailer = require('nodemailer')
require('dotenv').config()
const Condidat = require('../models/candidat.models')
const Company  = require('../models/companyRes.models')
const crypto = require('crypto')
const { registerValidation, loginValidation } = require('../validation')


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rouapfe@gmail.com',
        pass: process.env.AUTH_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})
exports.register = async (req, res) => {


    const { role } = req.body
   const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
 

    const emailExist = await User.findOne({ email: req.body.email })

    if (emailExist) return res.status(400).send('Email already exists')
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

     
     let data = {
         ...req.body,
         ['password']: hashedPassword
     }
    
    try {

        let user
console.log(role);
        if (role == 'condidat') {

            user = new Condidat(data)

            await user.save()

        } else {
            user = new Company(data)

            await user.save()
        }
    
        const token = await jwt.sign({ _id: user._id  }, process.env.TOKEN_SECRET)
        var mailOptions = {
            from: '" verify your email" <rouapfe@gmail.com>',
            to: user.email,
            subject: 'codewithsid _verify your email',
            html: `<h2>${user.username}! thanks for registerign on our site </h2>
                <h4> Please verify your email to continue..</h4>
                <a href="http://${req.headers.host}/api/user/verify-email?token=${token}"> verify your email</a>`
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log('verification email is sent to your gmail account')

            }
        })
        res.send({ user: user._id })

    } catch (err) {
        return res.status(400).send(err)

    }
}
exports.verification = async (req, res) => {
    
    try {
        const token = req.query.token
        const decoded =   jwt.verify(token , process.env.TOKEN_SECRET )
        const user = await User.findByIdAndUpdate({_id : decoded._id} , {verified : true})
       /*  if (user) {
            user.emailToken = null
            user.verified = true
            await user.save()

        }
        else {
            console.log('email is not verified')
        } */
        res.send('acount successuly verified')
    }
    catch (err) {
        console.log(err)
res.status(401).json('invalid token')
    }

}
exports.login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or password is wrong')
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password')

    const token = jwt.sign({ _id: user._id , role : user.__t }, process.env.TOKEN_SECRET)
    return res.header('auth-token', token).send(token);


}



