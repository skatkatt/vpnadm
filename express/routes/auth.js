require('../models/users');

exports.do = function(req, res) {

	console.log(req.body);

	var login = req.body.login;
	var password = req.body.password;

	if( ! login )
	{
		return res.send( 400, { msg : 'no login' } );
	}
	if( ! password )
	{
		return res.send( 400, { msg : 'no password' } );
	}

	usersModel.findOne( { name : login }, function (err, user) {
        if (!err) {
			console.log(user);
        	if ( password == user.password )
			{
				console.log('access granted for ' + login );
				
				var tocken = user.generateTocken();
				
				user.save( function (err,user) {
					if (!err) {
						console.log( user );
                		return res.send( { tocken : tocken, msg : 'access granted' } );
					} else {
						console.log( err );
						return res.send( 500, { msg : 'query failed' } );	
					}
				});				
			}
			else
			{
				console.log('access denied for ' + login );
				return res.send(403, { msg : 'access denied' } );
			}
        } else {
			console.log(err);
            return res.send(500, { msg : 'query failed' } );
        }
    });
};
