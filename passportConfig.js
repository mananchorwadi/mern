const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const user = require("./schema")

exports.initializePassport = (passport)=>{passport.use(new LocalStrategy(async(username,password,done)=>{

    try{
        const User = await user.findOne({UserName : username})
        if(!User){
            return done(null,false,{message : 'No User Found'})
        }
        else if(user.password !== passport){
            return done(null,false,{message : 'Invalid Password'})
        }
        return done(null,User)
    }
    catch(err){
        done(err)
    }
    
    passport.serializeUser((User,done)=>
    {
        done(null,User.id)
    })
    passport.deserializeUser(async(id,done)=>{
        try{
        const user = await User.findById({id})
        done(null,user)
        }
        catch(err)
        {
            done(err)
        }

    })
}))}

