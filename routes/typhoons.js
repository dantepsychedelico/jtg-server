'use strict';

var express = require('express');
var router = express.Router();
let { getDb } = require('../config/mongo');
let bodyParser = require('body-parser');
let _ = require('lodash');

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

router.post('/report', function(req, res, next) {
  let db = getDb();
  let ri = db.collection('report_info');
  let body = req.body;
  body.create_ts = new Date();
  ri.insertOne(req.body, (err, r) => {
    if (err) res.status(500).send(err.message);
    else {
      res.send();
    }
  });
})

router.get('/report', function(req, res, next) {
  let db = getDb();
  let ri = db.collection('report_info');
  ri.find({})
    .sort({ 'create_ts': -1 })
    .limit(10)
    .toArray((err, docs) => {
      if (err) console.log(err);
      res.json(_.map(docs, (d) => {
        return {
          img: d.img,
          lat: d.pos.coords.latitude,
          lot: d.pos.coords.longitude,
          desc: d.desc,
          create_ts: d.create_ts
        };
      }));
    });
});

module.exports = router;
