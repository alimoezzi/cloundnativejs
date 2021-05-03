var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    console.log('index.js')
    res.render("index", {
        title: "My Express!",
        port: process.env.nodeserverzipkinport,
        db: process.env.dbpass
    });
});

module.exports = router;
