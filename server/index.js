const express = require('express');
const path = require('path');
const { getPlacesPromise, getClosingHoursPromise } = require('./yelp');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/latenight', (req, res) => {
  let retrieve5 = getPlacesPromise();
  retrieve5.then(results => res.send(results));
})

app.get('/api/hours/:id', (req, res) => {
  let id = req.params.id;
  let getClosingHours = getClosingHoursPromise(id);
  getClosingHours.then(result => res.send(JSON.stringify(result)));
})

app.listen(port, () => console.log(`App is listening on port ${port}...`))