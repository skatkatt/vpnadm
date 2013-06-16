var mongoose = require( 'mongoose' );
var uuid = require('node-uuid');

// SCHEMA
/*
var tockenSchema = new mongoose.Schema({
	tocken : { type: String, required: true, unique: true, default: uuid.v4() },
	since  : { type: Date, required: true, default: Date.now },
	expire : { type: Date, required: true, default: function(){ return Date.now() + 24*3600*1000 } },
	user   : { type: mongoose.Schema.Types.ObjectId, ref: 'usersModel', required: true }
});

tockenModel = mongoose.model( 'tocken', tockenSchema );
*/
var userSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, lowercase: true, trim: true },
	password: { type: String, required: true },
	level: { type: String, enum: ['user','admin','root'] },
	since: { type: Date, required: true, default: Date.now },
//	tockens: [ { type: mongoose.Schema.Types.ObjectId, ref: 'tockenModel' } ],
});

// VALIDATORS

userSchema.path('name').validate(function ( name ) {
    console.log("validate user name : " + name);
    return name.length > 4 && name.length < 20;
});

// METHODS
/*
usersSchema.method('generateTocken',function(){

	var tocken = new tockenModel( { user:this._id } );
	tocken.save();
	this.tockens.push(tocken._id);
	return tocken;

});

userSchema.method('checkTocken',function(){
	
});
*/

User = mongoose.model( 'user', userSchema );
