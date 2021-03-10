var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Express!!!!', port: process.env.nodeserverzipkinport });
});

module.exports = router;
