// const http = require('http')
// const fs = require('fs')
// const url = require('url')
// const path = require('path')
// const myServer = http.createServer((req, res)=>{
//     // const log = ${new Date():$(req.url)}:requested\n
//     const log = `${new Date()}:server has been requested on ${req.url}\n` 
//     fs.appendFile('log.txt',log,()=>{})
//     console.log("Requested")
//     switch(req.url)
//     {
//         case '/':
//             if(req.method==='GET'){

            
//             fs.readFile(path.join(__dirname,'index.html'),(err, content)=>{res.end(content)})
//             }
//             else if(req.method==='POST')
//             {
//                 res.end("Post method execution")
//             }
//             else if(req.method==="PUT")
//             {
//                 res.end("Put method executed.")
//             }
//             break;

//         case '/about':
//             res.end("Hii, I am Rudra")
//             break;
//         case '/services':
//             res.end("Services available")
//             break;
//         default:
//             res.end("404 Page is not Found")
//     }
// })
// myServer.listen(8001,()=>{console.log("Server Created")})

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const user = require('./schema')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const { initializePassport } = require('./passportConfig');

mongoose.connect('mongodb://127.0.0.1:27017/formData')


.then(()=>{console.log("MongoDB connected")})
.catch((err)=>console.log("MongoDB connection error",err))


app.use(session({
    secret : 'your_secret_key',
    resave : false,
    saveUninitialized : false
}))



// app.use((req,res,next)=>{
//     console.log("user trying to access middle1")
//     next()
// })
// app.use((req,res,next)=>{
//     console.log("user trying to access middle2")
//     res.send("welcome")
//     next()
// })

initializePassport(passport)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));


app.get('/',(req,res)=>{
    return res.sendFile(__dirname+'/public/index.html')
})
app.get('/about', (req, res) => {
    res.send("Welcome to About Page")
})
app.get('/register', (req, res) => {
    res.sendFile(__dirname+'/public/register.html')
})
app.get('/home', (req, res) => {
    res.send("Welcome to Home Page")
})

app.post("/register",(req,res)=>{
    const Newuser = new user({
        name : req.body.name,
        email : req.body.email,
        UserName : req.body.UserName,
        password : req.body.password
    })
    Newuser.save()
    .then(()=>{res.send("user saved successfully")})
    .catch(err=>res.status(500))
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/public/login.html')
})
app.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),(req,res) => {
     res.send(`Welcome ${req.user.UserName}`);
    }
);
app.listen(8000,()=>{
    console.log('http://localhost:8000')
})