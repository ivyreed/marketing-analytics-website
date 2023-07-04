const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(
  '718e1d50ea515a3f9c22a52c5af27bc012712c03142e35ad9bc365b279c36c36'
);
// var queryURL = `https://serpapi.com/search.json?engine=google_trends&q=coffee&data_type=${data_type}`;

// const searchInput = document.querySelector('#search-input');
// const query = searchInput.value;
const params = {
  engine: 'google_trends',
  data_type: 'TIMESERIES',
};

const callback = function (data) {
  console.log(data['interest_over_time']);
};

// Show result as JSON
search.json(params, callback);

// fetch(queryURL)
//   .then(function (resp) {
//     console.log(resp);
//     return resp.json();
//   })
//   .then(result => {
//     loop(result);
//   });
