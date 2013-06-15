require('../models/users');

exports.list = function(req, res) {
	
	usersModel.find(function (err, users) {
		if (!err) {
			return res.send(users);
		} else {
			return console.log(err);
		}
  	});

};
 
exports.get = function(req, res) {
	
	usersModel.findById(req.params.id, function (err, user) {
    	if (!err) {
      		return res.send(user);
    	} else {
      		return console.log(err);
    	}
  	});

};

exports.create = function (req, res) {
  
  	var user = new usersModel({
    	name: req.body.name,
    	password: req.body.password,
    	level: req.body.level,
  	});
  
	user.save( function (err) {
    	if (!err) {
      		return console.log( "user " + user.name + " created" );
    	} else {
      		return console.log(err);
    	}
  	});
  
};

exports.update = function (req, res) {

	usersModel.findById(req.params.id, function (err, user) {
        if (!err) {
            
			user.name = req.body.name;
			user.password = req.body.password;
			user.level = req.body.level;	
 
			user.save( function (err) {
				if (!err) {
					return console.log( "user " + user.name + " updated" );
				} else {
					return console.log(err);
				}
			});
        
		} else {
            return console.log(err);
        }
    });   

};

exports.delete = function (req, res) {

    usersModel.findById(req.params.id, function (err, user) {
        if (!err) {

            user.remove( function (err) {
                if (!err) {
                    return console.log( "user " + user.name + " removed" );
                } else {
                    return console.log(err);
                }
            });
        
		} else {
            return console.log(err);
        }
    });

};

// populate db

exports.populate = function (req, res) {

	usersModel.remove(function (err) {
    	if (!err) {
      		console.log("all users removed");
    	} else {
      		console.log(err);
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
		var user = new usersModel( users[i] );
  
		user.save( function (err) {
			if (!err) {
				 console.log( "user " + user.name + " created" );
			} else {
				return console.log(err);
			}
  		});
	}

	return res.send('done');
}; 
