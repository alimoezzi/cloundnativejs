var express = require('express');
var router = express.Router();

/* POST return reverse vowels. */
router.post('/', function(req, res, next) {
  var vowels = req.body.message.match(/[aeiou]/g);
  res.send(`${req.body.message.replace(/[aeiou]/g, () => vowels.pop())}`);
});

router.get('/', (req, res, next) => {
  res.status(405).sendStatus(405)
});

module.exports = router;
