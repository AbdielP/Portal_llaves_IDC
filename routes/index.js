var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'IDCKeys - Panamá Pacifico',
    idc: 'howard',
    user: '' 
  });
});

//Balboa home page
router.get('/balboa', function(req, res, next) {
  res.render('index', { 
    title: 'IDCKeys - Balboa',
    idc: 'balboa',
    user: '' 
  });
});

router.get('/login', function(req,res,next){
  res.render('login', {
    title: 'IDCKeys - Login',
		message: req.flash('loginMessage')
  })
});

router.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
});

router.post('/login', passport.authenticate('local-login',{
  failureRedirect: '/login',
  failureFlash: true
}),function(req,res){
  if(req.user.__v == 0){    //CAMBIAR A != , PORQUE 0 SIGNIFICA QUE NO HA SIDO VALIDADO
    res.render('index',{
      title: 'IDCKeys - Página principal',
      user: req.user.username
    })
  }else{
    res.redirect('http://localhost:8080/changepass')  //QUEDE AQUÍ: 4/10/2018 -> ESTA RUTA NO EXISTE | crear aqui cambiar pass
  }
});

module.exports = router;
