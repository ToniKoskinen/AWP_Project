// This is from lecture materials

const LocalStrategy=require("passport-local").Strategy
const bcrypt=require("bcrypt")


function initialize(passport,findUser,findUserByID){
    const authenticateUser = async(username, password, done) => {
        const user =await findUser(username)
        if (user==null){
            console.log("user not found")
            return done(null,false)
        }
        try {
            if (await bcrypt.compare(password,user.password)){
                console.log("Logged in:"+user.email)
                return done(null,user)
            } else {
                console.log("Incorrect password")
                return done(null,false)
            }

        } catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy(authenticateUser))
    passport.serializeUser((user,done) => done(null,user._id))
    passport.deserializeUser((id,done) => {
        return done(null,findUserByID(id))
    })

}
module.exports=initialize 