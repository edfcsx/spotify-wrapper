import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
  token: 'BQCyQ_zclf3HEB9YUy-moAaoANqVaGJa2sFDeN0aEVaWvvBP5QXJkVPayL-mu9b6e60Uxui_lkG05EUEJ-29z8q85Nj5eRSKAjh6sr6ohKC6ydU3pFwqST57sFqxSf2aF0bv6912iRldD4HIRLzkparwXPqfUw',
});

const albums = spotify.search.albums('Cartola');

albums.then((data) => data.albums.items.map((item) => console.log(item.name)));
