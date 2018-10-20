'use strict';

var express = require('express');
var router = express.Router();
let { getDb } = require('../config/mongo');
let bodyParser = require('body-parser');

/* GET users listing. */
router.get('/real', function(req, res, next) {
  let db = getDb();
  let ri = db.collection('realtime_info');
  ri.find({})
    .toArray((err, docs) => {
      if (err) console.log(err);
      res.json(docs[0]);
    });
});

var jsonParser = bodyParser.json();

router.post('/report', jsonParser, function(req, res, next) {
  let db = getDb();
  let ri = db.collection('report_info');
  let body = req.body;
  ri.insertOne(req.body, (err, r) => {
    if (err) res.status(500).send(err.message);
    else {
      res.send();
    }
  });
})

module.exports = router;
