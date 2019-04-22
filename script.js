const api_key = '4edde9fd3bfaeccc276caba3a1e71883';
const app_id = 'c20b748c';
const searchUrl = 'https://api.edamam.com/search'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function getNationalParks(query, maxResults) {
    const params = {
        app_key: api_Key,
        app_id: app_id,
        ingr: maxResults,
    }
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
  
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson, maxResults))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }