const Role = require('../models/roles.js');

exports.roleById = (req, res, next, id) => {
    Role.findById(id).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            })
        }
        req.role = data;
        next();
    })
};

exports.read = (req, res) => {
    return res.json(req.role);
};

exports.create = (req, res) => {
    console.log("creating role req.body=" + JSON.stringify(req.body));
    const role = new Role(req.body);
    role.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            })
        }
        console.log("role saved");
        return res.json(data);
    })
};

exports.list = (req, res) => {
    Role.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err.message()
            })
        }
        return res.json(data);
    })
};

exports.update = (req, res) => {
    console.log("req.body from update=" + JSON.stringify(req.body));
    console.log("_id=" + req.role._id);
    Role.findOneAndUpdate(
        { _id: req.role._id },
        { $set: req.body },
        { new: true },
        (err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err.message
                });
            }
            return res.json(data);
        }
    );
};

exports.remove = (req, res) => {
    console.log("_id from delete=" + req.role._id);
    const role = req.role;
    role.remove((err, data)=>{
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }
        return res.json(data);
    
    });            
};