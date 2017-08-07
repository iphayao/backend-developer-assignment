var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send("respond from api");
});

router.route('/bids')
    .get(function(req, res) {
        res.send({"name" : "phayao"});
    });

router.route('/bids/:id')
    .get(function(req, res) {
        res.send({"id" : req.params.id});
    })

router.route('/auctions')
    .get(function(req, res) {
        res.send({"auction" : "xxxxxx"});
    });

module.exports = router;

/*
auctions
*/