const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.locals.beers= beersFromApi;
    res.render('beers');
  })
  .catch(error => console.log(error));
})
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.locals.beer= responseFromAPI;
    res.render('random-beer');
  })
  .catch(error => console.log(error));
})
app.get('/beers/beer-*', (req, res) => {
  punkAPI
  .getBeer(req.params[0])
  .then(responseFromAPI => {
    res.locals.beer= responseFromAPI;
    res.render('random-beer');
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
