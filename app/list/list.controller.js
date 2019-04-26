List = require('./list.model');
// Handle index actions
exports.index = function (req, res) {
  List.get(function (err, contacts) {
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
// Handle create list actions
exports.new = function (req, res) {
  var list = new List();
  list.name = req.body.name;
  list.create_date = Date.now();
  // save the list and check for errors
  list.save(function (err) {
    if (err) {
      res.json(err);
    }
    else {
      res.json({
        message: 'New list created!',
        data: list
      });
    }
  });
};
// Handle view list info
exports.view = function (req, res) {
  List.findById(req.params.contact_id, function (err, list) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: 'list details loading..',
        data: list
      });
    }
  });
};
exports.getAll = function (req, res) {
  const userId = req.params.user_id;

  List.find({$or: [{owner: userId}, {shared_with: userId}]}, function (err, lists) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json({
        message: 'list of all lists',
        data: lists
      });
    }
  })
};
// Handle update list info
exports.update = function (req, res) {
  List.findById(req.params.contact_id, function (err, list) {
    if (err)
      res.send(err);
    list.name = req.body.name;
    // save the list and check for errors
    list.save(function (err) {
      if (err) {
        res.json(err);
      } else {
        res.json({
          message: 'list Info updated',
          data: list
        });
      }
    });
  });
};
// Handle delete list
exports.delete = function (req, res) {
  List.remove({
    _id: req.params.list_id
  }, function (err, list) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        status: "success",
        message: 'list deleted'
      });
    }
  });
};