const Estate = require('../models/estate');
const formidable = require("formidable");
const _ = require("lodash");

exports.estateById = (req, res, next, id) => {
    Estate.findById(id)
        .exec((err, estate) => {
            if (err || !estate) {
                return res.status(400).json({
                    error: "Estate not found"
                });
            }
            req.estate = estate;
            next();
        });
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    console.log("form from create = " + JSON.stringify(form));
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log("image error " + err);
            return res.status(400).json({
                error: err.message
            });
        }
        console.log("fields=" + JSON.stringify(fields));
        // check for all fields
        const {
            estateid,
            estatename,
            estatetype,
            estateaddress,
            contactphoneno,
            emailid,
        } = fields;

        if (
            !estateid ||
            !estatename ||
            !estatetype ||
            !estateaddress ||
            !contactphoneno ||
            !emailid
        ) {
            console.log("Fields required error");
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        console.log("All fields are present");
        let estate = new Estate(fields);
        console.log("estate object = " + JSON.stringify(estate));
        estate.save((err, result) => {
            if (err) {
                console.log("database write error" + err.message);
                return res.status(400).json({
                    error: err.message
                });
            }
            console.log("result = " + result);
            res.json(result);
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    console.log("form from update = " + JSON.stringify(form));
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log("update error " + err);
            return res.status(400).json({
                error: err.message
            });
        }
        console.log("fields=" + JSON.stringify(fields));
        // check for all fields
        const {
            estateid,
            estatename,
            estatetype,
            estateaddress,
            contactphoneno,
            emailid,
        } = fields;

        if (
            !estateid ||
            !estatename ||
            !estatetype ||
            !estateaddress ||
            !contactphoneno ||
            !emailid
        ) {
            console.log("Fields required error");
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        console.log("All fields are present");
        let estate = req.estate;
        estate=_.extend(estate,fields);            
        console.log("estate object = " + JSON.stringify(estate));
        estate.save((err, result) => {
            if (err) {
                console.log("database write error" + err.message);
                return res.status(400).json({
                    error: err
                });
            }
            console.log("result = " + result);
            res.json(result);
        });
    });
};

exports.list = (req, res) => {
    Estate.find()
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err.message
                });
            }
            res.json(result);
        });
};

exports.read = (req, res) => {
    res.json(req.estate);
};

exports.remove = (req,res) => {
    let estate=req.estate;
    estate.remove((err,result)=>{
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }
        res.json(result);
    });
};