const F2F_SEARCH_URL = 'http://food2fork.com/api/search'

function apiRequest(searchTerm, callback) {
  const request = {
		key: '40de15b588ac17a1e0a3fcdb2feeeb7e',
    q: searchTerm,
    count: 5
	}
	$.getJSON(F2F_SEARCH_URL, request, callback);
}

function renderHTML(result) {
  return `
    <div class='js-result'>
      <a href="${result.source_url}" class='js-result-image' target="_blank"><img src="${result.image_url}" alt=''></a>
      <br>
      <a class="js-result-name" href="${result.source_url}" target="_blank">${result.title}</a>
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