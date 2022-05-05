const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.models')
const nodemailer = require('nodemailer')
require('dotenv').config()
const Condidat = require('../models/candidat.models')
const Company = require('../models/companyRes.models')
const crypto = require('crypto')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
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
    /* 
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
 */

    const emailExist = await User.findOne({ email: req.body.email })

    if (emailExist) return res.status(400).json('Email already exists')
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

        const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
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
        console.log(err);
        return res.status(400).send(err)

    }
}
exports.verification = async (req, res) => {

    try {
        const token = req.query.token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findByIdAndUpdate({ _id: decoded._id }, { verified: true })
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

    const token = jwt.sign({ _id: user._id, role: user.__t }, process.env.TOKEN_SECRET)
    return res.header('auth-token', token).send(token);


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

