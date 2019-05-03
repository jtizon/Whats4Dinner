const key = '4edde9fd3bfaeccc276caba3a1e71883';
const id = 'c20b748c';
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
    let code = $('#r').val();
    let diet = $('#diet').val();
    let health = $('#health').val();
    let calories = $('#cal').val();
    let excluded = $('#exclude').val();
    let max = $('#max').val();
    getRecipes(query, code, diet, health, calories, excluded, max); 
    console.log(query);
  });
}

function getRecipes(query, code, diet, health, calories, excluded, max) {
  let qlength = query.length;
  let rlength = code.length;
  let dlength = diet.length;
  let hlength = health.length;
  let clength = calories.length;
  let elength = excluded.length;
  const params = new function(){
    const object = {};
    object.app_id = id;
    object.app_key = key;
    if(qlength > 0){
      object.q = query;
    }
    if(rlength > 0 && code !== "Select"){
      object.r = code;
    }
    if(dlength > 0 && diet !== "Select"){
      object.diet = diet;
    }
    if(hlength > 0 && health !== "Select"){
      object.health = health;
    }
    if(clength > 0){
      object.calories = calories;
    }  
    if(elength > 0){
      object.excluded = excluded;
    }  
    if(max > 0){
      object.to = max;
    }else if(max === ""){
      object.to = 10;
    }  
    return object;
  };
  console.log(params);
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
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    console.log('getRecipes');
}

function displayResults(responseJson) {
  console.log(responseJson);
    
  $('.results').empty();
  console.log(responseJson.hits.length);
  if(responseJson.hits.length > 0){
    for (let i = 0; i < responseJson.hits.length ; i++){
      console.log('Start');
      console.log(responseJson.hits[i].recipe.url);
      $('.results').append(
        `<h2 class="title">${responseJson.hits[i].recipe.label}</h2>
        <a href="${responseJson.hits[i].recipe.url}">
          <img src="${responseJson.hits[i].recipe.image}">
        </a>
        <p>${responseJson.hits[i].recipe.healthLabels}</p>
        <p>${responseJson.hits[i].recipe.ingredientLines}</p>
        </li>`
      )};
    console.log('Finished');
  }
  else{
    $('.results').append(
      `<header> Sorry no results were found! Please Try Again!`
    )
  }
  window.scrollTo(0, 1150);
}

getValue();

//Hello this is a test
//Trying to find out what laptop I want

