const { TOKEN } = require('../config');
const axios = require('axios');
process.env.TZ = 'America/Los_Angeles';

const getClosingHoursPromise = (placeId) => {
  return (
    axios({
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/${placeId}`,
    headers: {'Authorization': `Bearer ${TOKEN}`},
    })
    .then(response => {
      const business = response.data;
      const d = new Date();
      const day = d.getDay();
      const hours = business.hours[0].open[day];
      return hours.end;
    })
    .catch(error => {
      console.log('YELP.JS: ERROR RETRIEVING CLOSING HOURS');
    })
  );
}

const getPlacesPromise = () => {
  const input = 'food';
  const lat = '47.599063';
  const long = '-122.333806';
  const radiusInMeters = 1000;
  const token = TOKEN;
  const today = new Date();
  today.setDate(today.getDate());
  today.setHours(22,00,00);
  return (
    axios({
      method: 'get',
      url: 'https://api.yelp.com/v3/businesses/search',
      headers: {'Authorization': `Bearer ${token}`},
      params: {
        term: input,
        latitude: lat,
        longitude: long,
        radius: radiusInMeters,
        open_at: Math.floor(today.getTime()/1000),
        limit: 50,
        offset: Math.floor(Math.random() * 20),
      },
    }) 
    .then((data) => {
      console.log(`YELP.JS: ${data.data.businesses.length} RESULTS SUCCESSFULLY RETRIEVED`);
      let finalists = [];
      let businesses = data.data.businesses;
      for (let j = 0; j < 5; j++) {
        const index = Math.floor(Math.random() * businesses.length);
        finalists.push(businesses.splice(index, 1)[0]);
      }
      return finalists;
    })
    .catch((error) => {
      console.log('YELP.JS: ERROR RETRIEVING DATA', error);
      return error;
    })
  );
}

module.exports = {
  getClosingHoursPromise, 
  getPlacesPromise,
};

