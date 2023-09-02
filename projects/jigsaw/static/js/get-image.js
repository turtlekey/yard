const apiKey = '563492ad6f91700001000001fcc83a2c8f7b4558972d350047755123';

async function getImage(keyword) {
  let index = Math.floor(Math.random() * 7913) + 1;
  let baseUrl = `https://api.pexels.com/v1/search?per_page=1&query=${keyword}&page=${index}`;
  let response = await fetch(baseUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: apiKey
    }
  });

  let result = await response.json();

  return result.photos[0].src.portrait
}


export { getImage };

