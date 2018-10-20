'use strict';

var express = require('express');
var router = express.Router();
let { getDb } = require('../config/mongo');

/* GET users listing. */
router.get('/default', function(req, res, next) {
  let db = getDb();
  let ii = db.collection('item_info');
  ii.find({
    importance: { $lte: 7 }, 
//     age: 'below 5 years old'
  })
    .toArray((err, docs) => {
      if (err) console.log(err);
      res.json(docs);
    });
});

router.get('/recommend', function(req, res, next) {
  let db = getDb();
  let ii = db.collection('item_info');
  ii.find({
    age: 'all',
    items: { $nin: req.query.items || [] }
  })
    .limit(3)
    .toArray((err, docs) => {
      if (err) console.log(err);
      res.json(docs);
    });
});
module.exports = router;
