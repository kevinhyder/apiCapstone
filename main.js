const F2F_SEARCH_URL = 'http://food2fork.com/api/search'

function apiRequest(searchTerm, callback) {
  const request = {
		key: '40de15b588ac17a1e0a3fcdb2feeeb7e',
    q: searchTerm,
    count: 30
	}
	$.getJSON(F2F_SEARCH_URL, request, callback);
}

function getRecipe(result, callback){
  const request = {
    key: '40de15b588ac17a1e0a3fcdb2feeeb7e',
    rId: result.recipe_id
  }
  $.getJSON("http://food2fork.com/api/get", request, callback);
}

function renderHTML(result) {

  let results = `
    <div class='js-result'>
      <a href="${result.recipe.source_url}" target="_blank"><img class='js-result-image' src="${result.recipe.image_url}" alt=''></a>
      <br>
      <a href="${result.recipe.source_url}" target="_blank"><span class="js-result-name">${result.recipe.title}</span></a>
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