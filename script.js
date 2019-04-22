const api_key = '4edde9fd3bfaeccc276caba3a1e71883';
const app_id = 'c20b748c';
const searchUrl = 'https://api.edamam.com/search'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

