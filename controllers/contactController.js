// Import contact model
const { reverse } = require('../data/contactsData');
var Contact = require('../models/contactModel');

// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
            return
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    //return error if name is not filled
    if (!contact.name) {
        res.json({
            status: "error",
            message: "Please input a name for your contact."
        })
        return
    }

    // save the contact and check for errors
    contact.save(function (err) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
            return
        }
        res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            res.json({
                status: "error",
                message: "Contact cannot be found."
            });
            return
        }
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {
    Contact.findById(req.params.contact_id, function (err1, contact) {
        if (err1) {
            res.json({
                status: "error",
                message: "Contact cannot be found."
            });
            return
        }    
        
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender ? req.body.gender : contact.gender;
        contact.email = req.body.email ? req.body.email : contact.gender;
        contact.phone = req.body.phone ? req.body.phone : contact.phone;
        
        // save the contact and check for errors
        contact.save(function (err2) {
            if (err2){
                res.json(err2);
                return
            }
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err) {
            res.send(err);
            return
        }
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};