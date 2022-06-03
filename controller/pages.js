const Page = require('../models/pages.js');

exports.pageById = (req, res, next, id) => {
    Page.findById(id).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            })
        }
        req.page = data;
        next();
    })
};

exports.read = (req, res) => {
    return res.json(req.page);
};

exports.create = (req, res) => {
    console.log("creating role req.body=" + JSON.stringify(req.body));
    const page = new Page(req.body);
    page.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }
        console.log("page saved");
        return res.json(data);
    });
};

exports.list = (req, res) => {
    Page.find().exec((err, data) => {
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
    console.log("_id=" + req.page._id);
    Page.findOneAndUpdate(
        { _id: req.page._id },
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
    console.log("_id from delete=" + req.page._id);
    const page = req.page;
    page.remove((err, data)=>{
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }
        return res.json(data);    
    });            
};