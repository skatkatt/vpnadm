var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, lowercase: true, trim: true },
	password: { type: String, required: true },
	level: { type: String, enum: ['user','admin','root'] },
	since: { type: Date, required: true, default: Date.now },
});

userSchema.path('name').validate(function ( name ) {
    console.log("validate user name : " + name);
    return name.length > 4 && name.length < 20;
});

User = mongoose.model( 'user', userSchema );
