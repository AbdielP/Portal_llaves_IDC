var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
const allowed = 'espec';

module.exports = function(passport){
    passport.serializeUser(function(user,done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id,done){
		User.findById(id, function(err,user) {
			done(err, user);
		});
    });
    
    //Passport-local LOGIN
	passport.use('local-login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req,username, password, done){
			User.findOne({
				username: username
			}, function(err,user){
				if(err){
					return done(err);
				}

				if(!user){
					return done(null, false, req.flash('loginMessage', 'Usuario no encontrado.'));
				}

				if(user.password != password){
					return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta.'));
				}
				// return done(null, user);
				              
				if(user.type_account = allowed){
					return done(null, user);
				}else{
					return done(null,false, req.flash('loginMessage', 'Usuario no permitido.'));
				}

			});
		}
	));
}