const Training = require("../models/training.models");
exports.add = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Error occured" })
    }
    const training = new Training({
        diploma: req.body.diploma,
        studyField: req.body.studyField,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        result: req.body.result


    });
    await training.save().then(data => { res.send(data) })
        .catch(err => { res.status(500).send({ message: err.message || "something is wrong" }) })
};
exports.findAlltraining = (req, res) => {
    Training.find().then(trainings => {
        res.send(trainings);
    }).catch(err => {
        res.status(500).send({ message: "error" })
    });


}
exports.findById = (req, res) => {
    Training.findById(req.params.id).then((training) => {
        if (!training) {
            return res.status(404).send({ message: "coudln't find cv" })
        }
        res.send(training)

    }).catch((err) => {
        if (err.kind === 'objectId') {
            return res.status(404).send({ message: "Error" + req.params.id })
        }
        res.status(500).send({ message: "error" });

    })
}
exports.delete = (req, res) => {
    Training.findByIdAndDelete(req.params.id).then((training) => {
        if (!training) {
            return res.status(404).send({ message: "Unexisted cv" })
        }
        res.send(training)
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
    Training.findByIdAndUpdate(req.params.id, {
        diploma: req.body.diploma,
        studyField: req.body.studyField,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        result: req.body.result

    }).then(training => {
        if (!training) {
            return res.statu(404).send({ message: "Error" })
        }
        res.send(training);
    }).catch((err) => {
        if (err.kind === 'objectId') {
            return res.status(404).send({ message: "Error " + req.params.id })
        }
        return res.status(500).send({ message: "error" + req.params.id });

    })

}
