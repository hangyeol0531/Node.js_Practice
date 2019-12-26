var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log("11111111111");
});

router.get('/flash', function(req, res){
  console.log("2222222");
  req.session.message = '세션 메세지';
  req.flash('message', 'flash 메세지');
  res.redirect('/user/flash/result');
});

router.get('/flash/result', function(req, res){
  console.log("3333333");
  res.end(`${req.session.message} ${req.flash('message')}`);
});

module.exports = router;
