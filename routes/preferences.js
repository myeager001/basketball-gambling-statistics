var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Promise = require('bluebird');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('preferences');
});

router.post('/', function(req, res, next){
  knex('user_stats_preferences').select().where('user', req.user.id).del().then(function(){
    knex.transaction(function(trx){
      var keys=[];
      for(var stat in req.body){
        keys.push(stat);
      }
      console.log(keys)
      return Promise.map(keys, function(key){
        return knex('stats').select('id').where('name', key).first().then(function(object){
          id = object.id;
          return knex('user_stats_preferences').insert([{user: req.user.id, stat: id}]).transacting(trx);
        }).catch(function(err){
          next(err);
        });
      }).then(trx.commit).catch(trx.rollback);
    }).then(function(){
      res.redirect('/search');
    }).catch(function(err){
      next(err);
    });
  });

});


module.exports = router;
