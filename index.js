const express= require('express');
const app= express();
const path= require('path');
const studentRouter= require('./routes/studentRoute');
const adminRouter= require('./routes/adminRoute');
const facultyRouter= require('./routes/facultyRoute');
const {connectToMongoDB}= require('./connection');

app.use(express.urlencoded({extended:false}));

//setting templates 
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mongodb connection
connectToMongoDB('mongodb://127.0.0.1:27017/final-year-project');


//routes
app.get('/',(req,res)=>{
    res.render('home');
});
app.use('/student', studentRouter);
app.use('/admin', adminRouter);
app.use('/faculty', facultyRouter);

//listen
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})







