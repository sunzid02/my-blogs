const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://sunzid02:57Es5kcVzP7xgnEm@cluster0.xjhvunk.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))


const path = require('path');

// Set the view engine (e.g., ejs)
app.set('view engine', 'ejs');


//listen for request


//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


 
//routes
app.get('/', (req, res) =>{
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
});

//blog-routes
app.use('/blogs', blogRoutes);


//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});