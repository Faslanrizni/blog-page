/*

* express (npm i express)
* mongoose (npm i mongoose) => to connet mongo db, work as object mapper
* nodemon (npm i nodemon -g (sudo)) => to restart server / continues run
* dotenv (npm i dotenv) =>
* body-parser (npm i body-parser)  => to grab data from frontend to backend
* bcrypt (npm i bcrypt)
* jsonwebtoken (npm i jsonwebtoken)
*
* */
const cors = require('cors')
const express= require('express');/*work as framework in here*/
const mongoose = require('mongoose');/*to connect with database*/
require('dotenv').config();

const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT | 3000;
const app = express();
app.use(cors())

const userRoute = require('./routes/UserRoute');
const postRoute = require('./routes/PostRoute');

/* to grab the body of request => body parser */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
try{
    mongoose.connect('mongodb://127.0.0.1:27017/blog_api');
    app.listen(port,()=>{
        console.log(`server Started & running on port ${port}`);
    })
}catch (e){
    console.log(e);
}

app.get('/test-api',(req,resp)=>{
    return resp.json({'message':'Server Started!'})
})

//------------
app.use('/api/v1/users',userRoute);
app.use('/api/v1/posts',postRoute);