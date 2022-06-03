const formidable = require("formidable");
const User = require("../models/users");
const _ = require("lodash");
const { json } = require("body-parser");

exports.userById = (req, res, next, id) => {
    User.findById(id)
        .populate("rolesref")
        .populate("pagesref")
        .exec((err, user) => { 
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            req.profile = user;
            next();
        });
};

/*exports.findUserForEdit = (req, res, next, id) => {
    User.findById(id)
        .populate("rolesref","pagesref")        
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            req.edituser = user;
            next();
        });

}
*/
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();    
    console.log("form from create = "+JSON.stringify(form));
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log("image error " + err);
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        console.log("fields="+JSON.stringify(fields));
        // check for all fields
            const {
            userid,
            username,                        
            emailid,
            password,
            address,
            mobileno,
            rolesref,
            pagesref,
            dob,
       } = fields;
   
        console.log("rolesref=" + rolesref);

        console.log("pagesref=" + pagesref);
        if (
            !userid ||
            !username ||
            !rolesref ||
            !emailid ||
            !password ||
            !address ||
            !mobileno ||
            !pagesref ||
            !dob
        ) {
            console.log("Fields required error");
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        console.log("All fields are present");
            let user = new User(fields);          
            console.log("user object = "+JSON.stringify(user));
            user.save((err, result) => {
            if (err) {
                console.log("database write error" + err);
                return res.status(400).json({
                    error: err.message
                });
            }
            console.log("result = "+result);
            res.json(result);
        });
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

/*exports.userread = (req, res) => {
    console.log("edituser._id from userread="+req.edituser._id);
    req.edituser.hashed_password = undefined;
    req.edituser.salt = undefined;
    return res.json(req.edituser);
};*/

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        let user = req.profile;   
        user = _.extend(user, fields);
        user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }        
        res.json(result);
    });   
    
    });     
};

exports.userupdate = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let user = req.edituser;   
    user = _.extend(user, fields);
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(result);
    });
    });
};

exports.remove = (req, res) => {
    let user = req.profile;
    user.remove((err, deleteduser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "User deleted successfully"
        });
    });
};
/*
exports.deleteuser = (req, res) => {       
    let user = req.edituser;
    console.log("user from deleteuser = "+user);
    user.remove((err, editeduser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "User deleted successfully"
        });
    });
}*/

exports.list = (req, res) => {
    User.find()
        .populate("rolesref")
        .populate("pagesref")
        .exec((err, users) => {
            if (err) {
                console.log("userlist=" + err)
                return res.status(400).json({
                    error: "Users not found"
                });
            }
            console.log("user list=" + users);
            res.json(users);
        });
};

