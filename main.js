const EDA_SEARCH_URL = 'https://api.edamam.com/search'

function apiRequest(searchTerm, callback) {
  const request = {
    q: searchTerm,
    app_id : "18fda3dc",
    app_key: '8342709f6dd61024819e034ac5c477d2'
    }
    $.getJSON(EDA_SEARCH_URL, request, callback);
}

function getRecipe(result, callback){
  const request = {
    key: '8342709f6dd61024819e034ac5c477d2',
    rId: result.uri
  }
  $.getJSON("https://api.edamam.com/search?q={searchTerm}&app_id=${app_id}&app_key=${app_key}", request, callback);
}

function renderHTML(result) {
  let results = `
    <div class='js-result'>
      <a href="${result.recipe.url}" target="_blank"><img class='js-result-image' src="${result.recipe.image}" alt=''></a>
      <br>
      <a href="${result.recipe.url}" target="_blank"><span class="js-result-name">${result.recipe.label}</span></a>
    </div>
  `;

  $('.results-return').append(results);
}

function displayCards(data) {
  $('.results-return').html("");
  const results = data.recipes.map(recipe => getRecipe(recipe, renderHTML));
}

function handleSubmit() {
  $('.input-form').submit(event => {
    event.preventDefault();
    const searchTermInput = $(this).find('#input_field');
    const searchQuery = searchTermInput.val();
    searchTermInput.val("");
    apiRequest(searchQuery, displayCards);
  });
}

$(handleSubmit);