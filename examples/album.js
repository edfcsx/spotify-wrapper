const spotifyWrapper = require('../src/index');

global.fetch = require('node-fetch');

const albums = spotifyWrapper.searchAlbums('Confessions');

albums.then((data) => data.albums.items.map((item) => console.log(item.name)));
