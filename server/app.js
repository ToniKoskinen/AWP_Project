var express = require('express');
var path = require('path');
var mongoose=require("mongoose")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require("cors")



//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Database
const mongoDB="mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise=Promise
const db=mongoose.connection
db.on("error",console.error.bind(console,"MongoDB Connection error"));

var app = express();
app.use(cors({origin: "http://localhost:3000", optionsSuccessStatus: 200}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);





if (process.env.NODE_ENV ==="production"){
    app.use(express.static(path.resolve("..", "client","build")))
    app.get("*", (req,res)=>
    res.sendFile(path.resolve("..","client","build","index.html"))
    )
    } else if(process.env.NODE_ENV ==="development") {
    var corsOptions= {

        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    }
    app.use(cors(corsOptions))
}

module.exports = app;
