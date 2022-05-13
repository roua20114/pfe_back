const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()
const Candidat = require('../models/candidat.models')
const Company = require('../models/companyRes.models')
const crypto = require('crypto')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const { registerValidation, loginValidation } = require('../validation')
const Admin=require('../models/admin.models')


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
exports.registercCandidat = async (req, res) => {
   
    const ccandiat= await Candidat.findOne({email:req.body.email});
    if(ccandiat){
        return res.status(400).json({message:'email already exists '})

    }
    const candidat=new Candidat(req.body)
    const salty= await bcrypt.genSalt(10)
    company.password=await bcrypt.hash(company.password,salty)
 
    await candidat.save()
    const tokenn = await jwt.sign({_id:candidat._id,candidat:candidat}, process.env.TOKEN_SECRET)
    
    // const { error } = registerValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message)
 
    

    try {
        var mailOptions = {
            from: '" verify your email" <rouapfe@gmail.com>',
            to: candidat.email,
            subject: 'codewithsid _verify your email',
            html: `<h2>${candidat.username}! thanks for registerign on our site </h2>
                <h4> Please verify your email to continue..</h4>
                <a href="http://${req.headers.host}/api/auth/verify-email?token=${tokenn}"> verify your email</a>`
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log('verification email is sent to your gmail account')

            }
        })
        res.send({ candidat: candidat})

    } catch (err) {
        console.log(err);
        return res.status(400).send(err)

    }
    
}
exports.verification = async (req, res) => {

    try {
        const token = req.query.token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const company = await Company.findByIdAndUpdate({ _id: decoded._id }, { verified: true })
        
        res.send('acount successuly verified')
    }
    catch (err) {
        console.log(err)
        res.status(401).json('invalid token')
    }
    try {
        const token = req.query.token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const candidat= await Candidat.findByIdAndUpdate({ _id: decoded._id }, { verified: true })
        
        res.send('acount successuly verified')
    }
    catch (err) {
        console.log(err)
        res.status(401).json('invalid token')
    }

}
exports.login = async (req, res) => {
    let company=await Company.findOne({email:req.body.email})
    let admin= await Candidat.findOne({email:req.body.email})
    let addmin= await Admin.findOne({email:req.body.email})
    if(!admin && !company && !addmin ){
        return res.status(400).json({message:'User not found :('})
    
    }
    if(admin){
        const check=await bcrypt.compare(req.body.password,admin.password)
        if (!check){
            return res.status(400).json({message:'Invalid Email or password'})
        }
        const token = jwt.sign({admin:{_id:admin._id,email:admin.email,role:admin.role}}, process.env.TOKEN_SECRET)
        return res.header('auth-token', token).send({token:token,admin:admin});
        
    }
    if(company){
        const check=await bcrypt.compare(req.body.password,company.password)
        if(!check){
            return res.status(400).json({
                meesage:"Invalid Email or Password "
            })
        }
        const token = jwt.sign({admin:{_id:company._id,email:company.email,role:company.role}}, process.env.TOKEN_SECRET)
        return res.header('auth-token', token).send({token:token,admin:company});
    }
    if(addmin){
        const check=await bcrypt.compare(req.body.password,addmin.password)
        if(!check){
            return res.status(400).json({
                meesage:"Invalid Email or Password "
            })
        }
        const token = jwt.sign({admin:{_id:addmin._id,email:addmin.email,role:addmin.role}}, process.env.TOKEN_SECRET)
        return res.header('auth-token', token).send({token:token,admin:addmin});
    }
    // const { error } = loginValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    

    
    


}
exports.forgetPassword = (req, res) => {
    const { email } = req.body;
    let errors = []
    if (!email) {
        errors.path({ msg: 'Please enter an email ID' })
    }
    if (errors.length > 0) {
        res.send({ errors, email })
    }
    else {
        User.findOne({ email: email }).then(user => {
            if (!user) {
                errors.push({ msg: 'User with Email Id does not exist !' })
                res.send({ errors, email })
            }
            else {
                const oauth2Client = new OAuth2(
                    "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
                    "OKXIYR14wBB_zumf30EC__iJ",
                    "https://developers.google.com/oauthplayground"

                )
                oauth2Client.setCredentials({
                    refresh_token: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w"
                })
                const accessToken = oauth2Client.getAccessToken()
                const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_Key, { expiresIn: '30m' })
                const CLIENT_URL = 'http://' + req.headers.host
                const output = `<h2>Please click on below link to reset your account password</h2>
                <p>${CLIENT_URL}/auth/forgot/${token}</p>
                <p><b>NOTE: </b> The activation link expires in 30 minutes.</p> `;
                User.updateOne({ resetLink: token }, (err, success) => {
                    if (err) {
                        errors.push({ msg: 'Error ressetting password!' })
                    }
                    else {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                type: "OAUTH2",
                                user: "nodejsa@gmail.com",
                                clientId: "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
                                clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
                                refreshToken: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
                                accessToken: accessToken

                            }

                        })
                        const mailOptions = {
                            from: '"Auth Admin" <nodejsa@gmail.com>',
                            to: email,
                            subject: "Account Password Reset: NodeJS Auth ✔",
                            html: output,

                        }
                        transporter.sendMail(mailoOptions, (error, info) => {
                            if (error) {
                                console.log(error)
                                req.flash('error_msg', 'Smething went wrong on our end. please try again')
                            }
                            else {
                                console.log('Mail sent : %s', info.response);
                                req.flash('success_msg', 'Password reset link sent to email ID.Please follow the instructions')
                            }
                        })
                    }
                })
            }
        })
    }
}
exports.resetPassword = (req, res) => {
    var { password, password2 } = req.body
    const id = req.params.id
    let errors = []
    if (password || !password2) {
        req.flash('error_msg', 'Please enter all fields')
    } else if (password.length < 8) {
        req.flash('error_msg',
            'Password must be at least 8 characters')
    } else if (password != password2) {
        req.flash('error_msg', 'Passwords do not match')
    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                password = hash
                User.findByIdAndUpdate({ _id: id },
                    { password },
                    function (err, result) {
                        if (err) {
                            req.flash('error_msg', 'Error resetting password!')
                        } else {
                            req.flash('success_msg',
                                'Password reset successfully!')
                        }
                    })
            })
        })
    }

}
exports.logout = (req, res, next) => {
    req.logout()
    req.flash('success_msg', 'Youa are logged out')

}
exports.registerAdmin=async(req,res)=>{
    const aadmin= await Admin.findOne({email:req.body.email});
    if(aadmin){
        return res.status(400).json({message:'email already exists '})

    }
    const admin=new Admin(req.body)
    const salt= await bcrypt.genSalt(10)
    admin.password=await bcrypt.hash(admin.password,salt)
    admin.role="admin";
    await admin.save()
    const token = await jwt.sign({ admin:{_id:admin._id,admin:admin} }, process.env.TOKEN_SECRET)
    res.header("x-auth-token",token).send({admin:admin,token:token})

}
exports.registerCompany=async(req,res)=>{
    const ccompany= await Company.findOne({email:req.body.email});
    
    if(ccompany){
        return res.status(400).json({message:'email already exists '})
        
    }

    const company=new Company(req.body)
     const salt= await bcrypt.genSalt(10)
     const hash=await bcrypt.hash(company.password,salt)
     company.password=hash
     await company.save()
    const token = await jwt.sign({_id:company._id,company:company}, process.env.TOKEN_SECRET)
    
 
    

    try {
        var mailOptions = {
            from: '" verify your email" <rouapfe@gmail.com>',
            to: company.email,
            subject: 'codewithsid _verify your email',
            html: `<h2>${company.username}! thanks for registerign on our site </h2>
                <h4> Please verify your email to continue..</h4>
                <a href="http://${req.headers.host}/api/auth/verify-email?token=${token}"> verify your email</a>`
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log('verification email is sent to your gmail account')

            }
        })

    } catch (err) {
        console.log(err);
        return res.status(400).send(err)

    }
    res.header('auth-token', token).send({ company: company,token:token})

}

