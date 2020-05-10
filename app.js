var express = require('express');
var path = require('path');
var { projects } = require('./data/data.json');

var app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.locals = projects.data
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about', { projects });
});

app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    
    if (project) {
        res.render('project', { project });
    } else {
        res.sendStatus(404);
    }
});

// error handler
app.use((req, res, next) => {
        // Log statement to indicate that this function is running 
        console.log('Handling 404 error');
      
        // Create new error to handle non-existent routes
        const err = new Error('err');
        err.status = 404;
        err.message = 'Oops, page not found. Looks like that route does not exist.';
      
        // Pass error to global error handler below
        next(err);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});