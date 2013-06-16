var express 	= require('express');
var app 		= express();
var server 		= require('http').createServer(app);
var passport	= require('passport');
var io 			= require('socket.io').listen(server);
var mongoose 	= require('mongoose');

app.configure(function(){
	app.use(express.favicon());
	app.use(express.static('./www'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
  	app.use(passport.session());
	app.use(app.router);
});

// Database

mongoose.connect('mongodb://localhost/vpnadm');

// socket.io

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// AUTH
require('./models/users');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  	function(username, password, done) {
		console.log(username + " " + password)
    	User.findOne({ name: username }, function (err, user) {
			if (err) { return done(err); }
			
			if (!user) {
				console.log('no user found for login ' + username );
				return done(null, false, { message: 'Incorrect username.' });
			}
			
			console.log(password + " " + user.password);
			if ( password != user.password ) {
				console.log('invalid credentials ' + password + ' for user ' + user.name );
				return done(null, false, { message: 'Incorrect password.' });
			}
			
			console.log('access granted to ' + user.name);
			return done(null, user);
		});
  	}
));

app.post('/login', function(req,res,next){
	req.logout();
	passport.authenticate('local', function(err,user,info){
		if (err) { 
			return res.send( 500, "oops" ); 
		}
		if (!user) { 
			return res.send( 401, "Not Authorized" ); 
		}
		req.logIn(user, function(err){
			if (err) { return next(err); }
			return res.send({ user : { name : user.name, level:user.level }, msg: "access granted" });
		});
	})(req,res,next);
});

app.get('/logout', function(req, res){
	if ( req.user )
	{
		var user = req.user;
		req.logout();
  		res.send( "bye " + user.name );
	}
	else
	{
		res.send( "Not autenticated" );
	}
});

// REST API

app.get('/api', function (req, res) {
  res.send('You\'re such a naab');
});

app.all('/api/*',function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.send(401,"Not Authorized");
    }
});

// USERS

var users = require('./routes/users');
app.get(	'/api/users', users.list);
app.post(	'/api/users', users.create);
app.get(	'/api/users/populate', users.populate);
app.get(	'/api/users/:id', users.get);
app.put(	'/api/users/:id', users.update);
app.delete(	'/api/users/:id', users.delete);


// So far so good

app.listen(3000);
console.log('Listening on port 3000...');
