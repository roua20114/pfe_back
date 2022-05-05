const User = require('../models/user.models')



exports.myprofile = (req, res) => {
    User.findOne({ _id: req.user._id }, (error, user) => {
        if (error) {
            console.log("something went wrong !!")
            res.json({ errormsg: "something went wrong" })
        }
        else {
            res.status(200).json({ user: user, msg: "all ok from myProfile" })
        }
    }).select("-password")

}
exports.editProfile = (req, res) => {
    let emailchange
    if (req.email == req.body.email) {
        emailchange = "no"
    }
    else {
        emailchange = "yes"
    }
    User.updateOne({ _id: req.userId }, {
        username: req.body.username,
        email: req.body.email,

    }, function (err, user) {
        if (err) {
            console.log("something  went wrong !!")
            res.json({ errormsg: "something went wrong!!" })
        }
        else {
            console.log("something went wrong!!")
            res.status(201).json({ msg: "edited profile", emailchange: emailchange })
        }
    })
}

exports.visited = (req, res) => {

    User.findByIdAndUpdate({ _id: req.params.id }, { $inc: { 'visited': 1 } }, { new: true }, (err, user) => {
        if (err) {
            res.status(500).json('error increment provile views')
        } else {
            res.status(200).json(user)
        }
    })

}


exports.getMostVisitedProfiles = async (req, res) => {


    const condidates = await User.find({ role: "condidat" })
    condidates.sort(function (a, b) {
        if (a.visited > b.visited) return -1
        if (a.visited < b.visited) return 1
        return 0
    })


    const companies = await User.find({ role: "company" })
    companies.sort(function (a, b) {
        if (a.visited > b.visited) return -1
        if (a.visited < b.visited) return 1
        return 0
    })


    res.status(200).json({
        message: 'top visited companies and condidates profiles',
        companies: companies.slice(0, 9),
        condidates: condidates.slice(0, 9)
    })

}