var express = require('express');
const path = require("path");
var router = express.Router();

var myitems = {
    "doing": ["comprehensive", "feature", "programming", "implement", "equivalent"],
    "todo": ["high-level", "graphical", "mechanics", "expressions", "statements"],
    done: ["language", "specialized", "professional", "bunch", 'Monty Python"s Flying Circus'],
};

/* GET  . */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..',"build", "index.html"));
});
router.get('/additem', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..',"build", "index.html"));
});

router.get('/:action', function(req, res, next) {
  switch (req.params.action) {
    case 'move':
      myitems = {
        ...myitems, 
        [req.query.from]: myitems[req.query.from].filter(i => i === req.query.item),
        [req.query.to]: [...myitems[req.query.to], req.query.item],
      }
      res.status(200).send(JSON.stringify({'Result': 'OK'}))
      break;
    case 'add':
      myitems = {
        ...myitems, 
        [req.query.to]: [...myitems[req.query.to], req.query.item],
      }
      res.status(200).send(JSON.stringify({'Result': 'OK'}))
      break;
    case 'get':
      res.status(200).send(JSON.stringify({'Result': myitems[req.query.type]}))
      break
    default:
      res.status(400).send(JSON.stringify({'Error': 'failed'}))
      break;
  }
});



module.exports = router;
