'use strict';

var express = require('express');
var router = express.Router();
let { getDb } = require('../config/mongo');

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

module.exports = router;
