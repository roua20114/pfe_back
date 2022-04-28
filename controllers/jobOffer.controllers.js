const Offer = require("../models/jobOffer.models");


exports.add = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Error occured" })
    }
    console.log(req.file)
    const offer = new Offer({
        title: req.body.title,
        description: req.body.description,
        qualifications: req.body.qualifications,
        expirationDate: req.body.expirationDate,
        jobType: req.body.jobType,
        region: req.body.region,
        technologiesReq: req.body.technologiesReq,
        diplomaReq: req.body.diplomaReq,
        placesAvai: req.body.placesAvai,
        fields: req.body.fields,

    });
    await offer.save().then(data => { res.send(data) })
        .catch(err => { res.status(500).send({ message: err.message || "something is wrong" }) })
};
exports.findAllOffers = (req, res) => {

    let query = req.body.fields == '' ? {} : { fields: req.body.fields }

    Offer.find(query)
    .populate('fields')
    .then(offers => {
        res.send(offers);
    }).catch(err => {
        res.status(500).send({ message: "error" })
    });


}
exports.findById = (req, res) => {
    Offer.findById(req.params.id).then((offer) => {
        if (!offer) {
            return res.status(404).send({ message: "coudln't find Field" })
        }
        res.send(offer)

    }).catch((err) => {
        if (err.kind === 'objectId') {
            return res.status(404).send({ message: "Error" + req.params.id })
        }
        res.status(500).send({ message: "error" });

    })
}
exports.delete = (req, res) => {
    Offer.findByIdAndDelete(req.params.id).then((offer) => {
        if (!offer) {
            return res.status(404).send({ message: "Unexisted Offer" })
        }
        res.send(offer)
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
    Offer.findByIdAndUpdate(req.params.id, {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        qualifications: req.body.qualifications,
        expirationDate: req.body.expirationDate,
        jobType: req.body.jobType,
        region: req.body.region,
        technologiesReq: req.body.technologiesReq,
        diplomaReq: req.body.diplomaReq,
        placesAvai: req.body.placesAvai,

    }).then(offer => {
        if (!offer) {
            return res.statu(404).send({ message: "Error" })
        }
        res.send(offer);
    }).catch((err) => {
        if (err.kind === 'objectId') {
            return res.status(404).send({ message: "Error " + req.params.id })
        }
        return res.status(500).send({ message: "error" + req.params.id });

    })

}
exports.findOfferbyField = (req, res) => {

}
