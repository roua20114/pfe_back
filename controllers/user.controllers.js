const Candidat = require('../models/candidat.models')
const bcrypt=require('bcryptjs')
const Company=require('../models/companyRes.models')



exports.myprofile = (req, res) => {
    Candidat.findOne({ _id: req.candidat._id }, (error, candidat) => {
        if (error) {
            console.log("something went wrong !!")
            res.json({ errormsg: "something went wrong" })
        }
        else {
            res.status(200).json({ candidat: candidat, msg: "all ok from myProfile" })
        }
    }).select("-password")

}
exports.myprofileCompany = (req, res) => {
    Company.findOne({ _id: req.companyRes._id }, (error, companyRes) => {
        if (error) {
            console.log("something went wrong !!")
            res.json({ errormsg: "something went wrong" })
        }
        else {
            res.status(200).json({ companyRes: companyRes, msg: "all ok from myProfile" })
        }
    }).select("-password")

}
exports.editProfileCandidat= async (req, res) => {
   if(req.body.candidatId===req.params.id){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password= await bcrypt.hash(req.body.password,salt)
            }catch(err){
                return res.status(500).json(err)
            }
        }
            try{
                const candidat=await Candidat.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                })
                res.status(200).json("Account has been updated")
            }catch(err){
                return res.status(500).json(err)
            }
   }
        
    
        else{
            return res.status(403).json("You can update only your account")

        }
 }
   


exports.editProfileCompany=async(req,res)=>{
    if(req.body.companyId===req.params.id){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password= await bcrypt.hash(req.body.password,salt)
            }catch(err){
                return res.status(500).json(err)
            }
            try{
                const company=await Company.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                })
                res.status(200).json("Account has been updated")
            }catch(err){
                return res.status(500).json(err)
            }
        }else{
            return res.status(403).json("You can update only your account")

        }
    }


}

exports.visited = (req, res) => {

    Candidat.findByIdAndUpdate({ _id: req.params.id }, { $inc: { 'visited': 1 } }, { new: true }, (err, user) => {
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
exports.deleteCandidat=async(req,res)=>{
    if(req.body.candidatId===req.params.id){
        try{
            const candidat= await Candidat.findByIdAndDelete(req.params.id)
               res.status(200).json("account has been deleted")
        }catch(err){
            return res.status(500).json(err)
        }
    }
        else{
            return res.status(403).json("You can only delete your account")
        }
     

    }
    exports.deleteCompany=async(req,res)=>{
        if(req.body.companyId===req.params.id){
            try{
                const company= await Commpany.findByIdAndDelete(req.params.id)
                   res.status(200).json("account has been deleted")
            }catch(err){
                return res.status(500).json(err)
            }
        }
            else{
                return res.status(403).json("You can only delete your account")
            }
         
    
        }
    