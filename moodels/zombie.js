var bcrypt = require ('bcrypt-nodejs');
var mongoose = require ('mongoose');

var SALT_FACT = 10;

var zombiSchema = mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    createdat:{type:Date,default:Date.now},
    displayName:{type:String},
    role:{type:String},
    bio:String
});
var donothing = () =>{

}

zombiSchema.pre("save",function(done){
    var zombie = this;
    if(!zombie.isModified("password")){
        return done();
    }
    bcrypt.genSalt(SALT_FACT,function(err,salt){
        if(err){
            return done(err);
        }
        bcrypt.hash(zombie.password, salt, donothing, 
            function(err,hashedpassword){
            if(err){
                return done(err)
            }
            zombie.password = hashedpassword;
            done();

        });
    });
});

zombiSchema.methods.checkPassword = function(guess, done){
    bcrypt.compare(guess,this.password,(err,isMatch) => {
        done(err, isMatch);
    });
}
zombiSchema.methods.name = function() {
    return this.displayName ||this.username;
}
var zombie = mongoose.model("zombie",zombiSchema);
module.exports = zombie;