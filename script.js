const api_key = '4edde9fd3bfaeccc276caba3a1e71883';
const app_id = 'c20b748c';
const searchUrl = 'https://api.edamam.com/search'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getValue() {
    $('form').submit(event => {
      event.preventDefault();
      let query = $('#search').val();
      let r = $('#r').val();
      let diet = $('#diet').val();
      let health = $('#health').val();
      let calories = $('#cal').val();
      let excluded = $('#exclude').val();
      getRecipes(query, r, diet, health, calories, excluded); 
      console.log(query);
    });
}

function getRecipes(query, r, diet, health, calories, excluded) {
    const params = {
        q: query,        
        app_id: app_id,
        app_key: api_key,
        r: r,
        //diet: diet,
        //health: health,
        //calories: cal,
        //excluded: exclude
    };
    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString;
  
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

  function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    
    $('.results').empty();
    console.log(responseJson.data.length);
    for (let i = 0; i < responseJson.data.length & i<maxResults ; i++){
      console.log('Start');
      console.log(responseJson.data[1].url);
      $('.results').append(
        `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></h3>
        <p>${responseJson.data[i].fullName}</p>
        <p>${responseJson.data[i].description}</p>
        </li>`
      )};
    console.log('Finished');
  }

  getValue();