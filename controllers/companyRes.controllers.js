const CompanyRes = require("../models/companyRes.models");
exports.add = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Error occured" })
    }
    const ress = new CompanyRes({
        companyName: req.body. companyName,
        companyAddress: req.body.companyAddress,
        webSite: req.body.webSite,
        description: req.body.description,
        creationDate: req.body.creationDate,
        logo : req.body.logo ,
        region:req.body.region,
        sector:req.body.sector,
        tel: req.body.tel,
        type: req.body.type,


    });
    await ress.save().then(data => { res.send(data) })
        .catch(err => { res.status(500).send({ message: err.message || "something is wrong" }) })
};
exports.findAllres = (req, res) => {
    CompanyRes.find().then(ress => {
        res.send(ress);
    }).catch(err => {
        res.status(500).send({ message: "error" })
    });


}
exports.findById = (req, res) => {
    CompanyRes.findById(req.params.id).then((ress) => {
        if (!res) {
            return res.status(404).send({ message: "coudln't find responsable" })
        }
        res.send(ress)

    }).catch((err) => {
        if (err.kind === 'objectId') {
            return res.status(404).send({ message: "Error" + req.params.id })
        }
        res.status(500).send({ message: "error" });

    })
}
exports.delete = (req, res) => {
    CompanyRes.findByIdAndDelete(req.params.id).then((res) => {
        if (!res) {
            return res.status(404).send({ message: "Unexisted res" })
        }
        res.send(res)
    }).catch((err) => {
        if (err.kind === 'objectId') {
            return res.status(404).send({ message: "ERROR Occured" + req.params.id })
        }
        res.status(500).send({ message: "error" })
    })
}
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "error" })
    }
    CompanyRes.findByIdAndUpdate(req.params.id, {
        companyName: req.body. companyName,
        companyAddress: req.body.companyAddress,
        webSite: req.body.webSite,
        description: req.body.description,
        creationDate: req.body.creationDate,
        logo : req.body.logo ,
        region:req.body.region,
        sector:req.body.sector,
        tel: req.body.tel,
        type: req.body.type,

    }).then(ress => {
        if (!ress) {
            return res.statu(404).send({ message: "Error" })
        }
        res.send(ress);
    }).catch((err) => {
        if (err.kind === 'objectId') {
            return res.status(404).send({ message: "Error " + req.params.id })
        }
        return res.status(500).send({ message: "error" + req.params.id })

    })

}
