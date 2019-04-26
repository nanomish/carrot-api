Contact = require('./contact.model');
// Handle index actions
exports.index = function (req, res) {
  Contact.get(function (err, contacts) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
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
  contact.name = req.body.name ? req.body.name : contact.name;
  contact.gender = req.body.gender;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  contact.password = req.body.password;
// save the contact and check for errors
  contact.save(function (err) {
     if (err) {
       res.json(err);
     }
     else {
       res.json({
         message: 'New contact created!',
         data: contact
       });
     }
  });
};
// Handle view contact info
exports.view = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: 'Contact details loading..',
        data: contact
      });
    }
  });
};
// Handle update contact info
exports.update = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err)
      res.send(err);
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
// save the contact and check for errors
    contact.save(function (err) {
      if (err) {
        res.json(err);
      } else {
        res.json({
          message: 'Contact Info updated',
          data: contact
        });
      }
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
    } else {
      res.json({
        status: "success",
        message: 'Contact deleted'
      });
    }
  });
};

// Handle login
exports.login = function (req, res) {
  Contact.findOne({email: req.body.email, password: req.body.password}, function (err, contact) {
    if (err) {
      res.status(400).json({
        status: "error",
        message: err,
      });
    }
    else if (contact && contact.token) {
      res.status(200).json({
        status: "success",
        message: "Contacts retrieved successfully",
        data: {
          token: contact.token,
          email: contact.email,
        }
      });
    }
    else {
      res.status(404).json({
        status: 'failure',
        message: 'Failed to login!'
      })
    }
  });
};