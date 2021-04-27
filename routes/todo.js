var express = require('express');
const path = require("path");
var router = express.Router();
const axios = require('axios');

// var myitems = {
//     "doing": ["comprehensive", "feature", "programming", "implement", "equivalent"],
//     "todo": ["high-level", "graphical", "mechanics", "expressions", "statements"],
//     done: ["language", "specialized", "professional", "bunch", 'Monty Python"s Flying Circus'],
// };

/* GET  . */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', "build", "index.html"));
});
router.get('/additem', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', "build", "index.html"));
});

router.get('/:action', async function (req, res, next) {
    switch (req.params.action) {
        case 'move':
            // myitems = {
            //     ...myitems,
            //     [req.query.from]: myitems[req.query.from].filter(i => i === req.query.item),
            //     [req.query.to]: [...myitems[req.query.to], req.query.item],
            // }

            const movePrevData = await axios({
                method: 'get',
                url: 'https://api.jsonbin.io/v3/b/60875bd7c7df3422f7fe9470/latest',
                headers: {'X-Master-key': process.env.dbpass}
            });
            await axios({
                method: 'put',
                url: 'https://api.jsonbin.io/v3/b/60875bd7c7df3422f7fe9470',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-key': process.env.dbpass
                },
                data: {
                    ...movePrevData.data.record,
                    [req.query.from]: movePrevData.data.record[req.query.from].filter(i => i !== req.query.item),
                    [req.query.to]: [...movePrevData.data.record[req.query.to], req.query.item]
                }
            });
            res.status(200).send(JSON.stringify({'Result': 'OK'}));
            break;
        case 'add':
            // myitems = {
            //     ...myitems,
            //     [req.query.to]: [...myitems[req.query.to], req.query.item],
            // }

            const addPrevData = await axios({
                method: 'get',
                url: 'https://api.jsonbin.io/v3/b/60875bd7c7df3422f7fe9470/latest',
                headers: {'X-Master-key': process.env.dbpass}
            });
            await axios({
                method: 'put',
                url: 'https://api.jsonbin.io/v3/b/60875bd7c7df3422f7fe9470',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-key': process.env.dbpass
                },
                data: {
                    ...addPrevData.data.record,
                    [req.query.to]: [...addPrevData.data.record[req.query.to], req.query.item]
                }
            });
            res.status(200).send(JSON.stringify({'Result': 'OK'}));
            break;
        case 'get':
            // res.status(200).send(JSON.stringify({'Result': myitems[req.query.type]}))

            const data = await axios({
                method: 'get',
                url: 'https://api.jsonbin.io/v3/b/60875bd7c7df3422f7fe9470/latest',
                headers: {'X-Master-key': process.env.dbpass}
            });
            res.status(200).send(JSON.stringify({'Result': data.data.record[req.query.type]}))
            break;
        default:
            res.status(400).send(JSON.stringify({'Error': 'failed'}))
            break;
        }
    }
);

module.exports = router;