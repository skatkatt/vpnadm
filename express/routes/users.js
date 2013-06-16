require('../models/users');

// CRUD

exports.list = function(req, res) {
	
	User.find(function (err, users) {
		if (!err) {
			return res.send( users );
		} else {
			console.log( err );
			return res.send( 500, { msg : 'query failed' } );
		}
  	});

};
 
exports.get = function(req, res) {
	
	var id = req.params.id;
	if( ! id)
	{
		return res.send( 400, { msg : 'missing id' } );
	}
	User.findById( id , function (err, user) {
    	if (!err) {
      		return res.send( user );
    	} else {
			console.log( err );
            return res.send( 500, { msg : 'query failed' } );	
		}
  	});

};

exports.create = function (req, res) {
  
  	var user = new User({
    	name: req.body.name,
    	password: req.body.password,
    	level: req.body.level,
  	});
  
	user.save( function (err,user) {
    	if (!err) {
      		return res.send( { msg : "user " + user.name + " created" } );
    	} else {
			console.log( err );
            return res.send( 500, { msg : 'query failed' } );
		}
  	});
  
};

exports.update = function (req, res) {

	User.findById(req.params.id, function (err, user) {
        if (!err) {
            
			user.name = req.body.name;
			user.password = req.body.password;
			user.level = req.body.level;	
 
			user.save( function (err,user) {
				if (!err) {
					return res.send( { msg : "user " + user.name + " created" } );
				} else {
					console.log( err );
            		return res.send( 500, { msg : 'query failed' } );		
				}
			});
        
		} else {
            return console.log(err);
        }
    });   

};

exports.delete = function (req, res) {

    User.findById(req.params.id, function (err, user) {
        if (!err) {

            user.remove( function (err) {
                if (!err) {
                    return res.send( { msg : "user " + user.name + " removed" } );
                } else {
                    console.log( err );
            		return res.send( 500, { msg : 'query failed' } );
                }
            });
        
		} else {
           	console.log( err );
            return res.send( 500, { msg : 'query failed' } );
        }
    });

};

// populate db

exports.populate = function (req, res) {

	User.remove(function (err) {
    	if (!err) {
      		console.log("all users removed");
    	} else {
      		console.log( err );
            return res.send( 500, { msg : 'query failed' } );
    	}
  	});	
	 
	var users = [{
	    name: 'skatkatt',
        password: 'naab',
        level: 'root',
    },
	{
		name: 'bodji',
        password: 'naab',
        level: 'admin',	
	}];

    for ( i in users )
	{
		var user = new User( users[i] );
  
		user.save( function (err,user) {
			if (!err) {
				 console.log( "user " + user.name + " created" );
			} else {
				console.log( err );
            	return res.send( 500, { msg : 'query failed' } );
			}
  		});
	}

	return res.send( { msg : 'done'} );
}; 
