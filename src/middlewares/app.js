import express from 'express';
import * as config from '../../config/config.json';
import { dao } from '../helpers';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import TwitterStrategy from 'passport-twitter';

export const authRouter = express.Router();

authRouter.post('/authjwt',(req, res) => {
	dao.getUser(req.body.userName)
		.then((user) => {
			if(user.password === req.body.password) {
				const currentUser = {
					name: user.name,
					role: user.role
				};
				const token = jwt.sign(currentUser, config.jwtSecret);
				res.append('x-auth', token);
				res.json({ code: 200, message: 'OK', token: 'JWT ' + token});
			} else {
				res.status(403).json({ status: 403, message: 'Wrong credential'});
			}
		})
		.catch((err) => {
			res.status(404).json({ status: 404, message: err});
		})
});

passport.use(new LocalStrategy((userName, password, done) => {
        dao.getUser(userName)
            .then((user) => {
                if(user.password === password) {
                    const currentUser = {
                        name: user.name,
                        role: user.role
                    };
                    return done(null, currentUser);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => {
                return done(null, false);
            })
    }
));

passport.serializeUser(function(user, done) {
	done(null, 'admin');
});

passport.deserializeUser(function(id, done) {
	dao.getUser('admin')
		.then((user) => {
			if(user.password === 'qwerty') {
				const currentUser = {
					name: user.name,
					role: user.role
				};
				return done(null, currentUser);
			} else {
				return done(null, false);
			}
		})
		.catch((err) => {
			return done(null, false);
		})
});

passport.use(new FacebookStrategy({
        clientID: '356414384828920',
        clientSecret: '554840cadc1b8a05b6db971416600ac5',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        	console.log(user);
            return cb(err, user);
        });
    }
));

passport.use(new TwitterStrategy({
		consumerKey     : 'k641bcEao3ycJr0LagTrDL4on',
		consumerSecret  : 'TgFNSjaK8pkP8Fkqou6LroxZTVR6xHC11Zs8vC7duDUHnXbkK1',
		callbackURL     : 'http://localhost:3000/auth/twitter/callback'
	},
	function(token, tokenSecret, profile, done) {
		dao.getUser('admin')
			.then((user) => {
				if(user.password === 'qwerty') {
					const currentUser = {
						id: profile.id,
						username: profile.username,
						role: user.role,
						token: token,
						displayName: profile.displayName
					};
					return done(null, currentUser);
				} else {
					return done(null, false);
				}
			})
			.catch((err) => {
				return done(null, false);
			})
	}));

authRouter.post('/authpassport', passport.authenticate('local', {session: false}),(req, res) => {
	console.log(req);
    const token = jwt.sign(req.user, config.jwtSecret);
    res.append('x-auth', token);
    res.json({ code: 200, message: 'OK', token: 'JWT ' + token});
});

authRouter.get('/auth/facebook',
    passport.authenticate('facebook'), (req, res) => {
		console.log('logined');
	});

authRouter.get('/auth/twitter', passport.authenticate('twitter'));
authRouter.get('/auth/twitter/callback', passport.authenticate('twitter', {
	successRedirect : '/api/users',
	failureRedirect : '/'
}));

