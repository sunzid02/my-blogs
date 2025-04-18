const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

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

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err);        
    })
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
        
    })
    
});



app.get('/about', (req, res) =>{
    res.render('about', { title: 'About' })
});



app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
});


app.get('/blogs/:id', (req, res) => {

    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog details' });
        })
        .catch((err) => {
            console.log(err);

        })
    console.log(id);

});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);

        });
});


//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});