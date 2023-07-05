// const SerpApi = require('google-search-results-nodejs');
// const search = new SerpApi.GoogleSearch(
//   '718e1d50ea515a3f9c22a52c5af27bc012712c03142e35ad9bc365b279c36c36'
// );
// var queryURL = `https://serpapi.com/search.json?engine=google_trends&q=coffee&data_type=${data_type}`;

// const searchInput = document.querySelector('#search-input');
// const query = searchInput.value;
// const params = {
//   engine: 'google_trends',
//   data_type: 'TIMESERIES',
// };

// const callback = function (data) {
//   console.log(data['interest_over_time']);
// };

// Show result as JSON
// search.json(params, callback);

// fetch(queryURL)
//   .then(function (resp) {
//     console.log(resp);
//     return resp.json();
//   })
//   .then(result => {
//     loop(result);
//   });

// async function displaySearchTerm() {
// const response =fetch('api/search',{
//   method: 'GET',
//   body:json.parse({
//     query: `${req.session.query}`
//   }),
// }
// }

async function saveSearchTerm() {
  const searchText = document.querySelector('#searchText').value.trim();
  console.log(searchText);
  const response = fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify({
      query: searchText,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    // const { message } = await response.json();
  }
}
document.querySelector('#searchBtn').addEventListener('click', saveSearchTerm);
