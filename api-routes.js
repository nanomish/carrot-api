let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to RESTHub crafted with love!'
  });
});

const contactController = require('./app/contact/contact.controller');
const loginController = require('./app/login/login.controller');
// Contact routes
router.route('/contacts')
  .get(contactController.index)
  .post(contactController.new);

router.route('/contacts/:contact_id')
  .get(contactController.view)
  .patch(contactController.update)
  .put(contactController.update)
  .delete(contactController.delete);

router.route('/login')
  .post(contactController.login)

module.exports = router;