const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next ) => {
   var currentTime = new Date().toString();
   var log = `${currentTime} ${req.method} ${req.url}`;

   console.log(log);
   fs.appendFile('server.log', log + '\n', (error) => {
      if(error) {
          console.log('Unable to append to server.log');
      }
   });
   next();
});

// app.use((req, res, next) => {
//    res.render('maintenance.hbs', {
//        pageTitle : 'Maintenance Page',
//        message : 'The server is being worked upon, will be back soon!!'
//    });
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

app.get('/', (request, response) => {
   //response.send('<h1>Hello Express!!</h1>');
//    response.send({
//        name : 'Abhi',
//        age : '26',
//        Hobbies : [
//            'Football',
//            'Dancing'
//        ]
//    });
    response.render('home.hbs', {
        pageTitle : 'Home',
        welcomeMessage : 'Welcome to the Home Page!!'
    });
});

app.get('/about', (request, response) => {
   response.render('about.hbs', {
       pageTitle : 'About Page'
   });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage : 'Unable to handle request'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});