const spotifyWrapper = require('../src/index');

global.fetch = require('node-fetch');

const albums = spotifyWrapper.searchArtists('Little Aida');

albums.then((data) => data.artists.items.map((item) => console.log(item.name)));
