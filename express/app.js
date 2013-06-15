var express 	= require('express');

var mongoose	= require('mongoose');
var users		= require('./routes/users');

var app = express();

app.configure(function(){
	app.use(express.static('../www'));
});

// Database

mongoose.connect('mongodb://localhost/vpnadm');

// REST API

app.get('/api', function (req, res) {
  res.send('You\'re such a naab');
});

// USERS
app.get(	'/api/users', users.list);
app.post(	'/api/users', users.create);
app.get(	'/api/users/populate', users.populate);
app.get(	'/api/users/:id', users.get);
app.put(	'/api/users/:id', users.update);
app.delete(	'/api/users/:id', users.delete);


// So far so good

app.listen(3000);
console.log('Listening on port 3000...');
