const F2F_SEARCH_URL = 'http://food2fork.com/api/search'

function apiRequest(searchTerm, callback) {
  const request = {
		key: '40de15b588ac17a1e0a3fcdb2feeeb7e',
    q: searchTerm,
    count: 30
	}
	$.getJSON(F2F_SEARCH_URL, request, callback);
}

function renderHTML(result) {
  return `
    <div class='js-result'>
      <a href="${result.source_url}" target="_blank"><img class='js-result-image' src="${result.image_url}" alt=''></a>
      <br>
      <a href="${result.source_url}" target="_blank"><span class="js-result-name">${result.title}</span></a>
    </div>
  `;
}

function displayCards(data) {
  const results = data.recipes.map(recipe => renderHTML(recipe));
  $('.results-return').html(results);
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