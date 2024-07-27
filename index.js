const express= require('express');
const app= express();
const path= require('path');
const router= require('./routes/user');
const {connectToMongoDB}= require('./connection');

app.use(express.urlencoded({extended:false}));

//setting templates 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mongodb connection
connectToMongoDB('mongodb://127.0.0.1:27017/login-signup');

//routes
app.use('/', router);

//listen
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})







