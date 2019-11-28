/* eslint-disable */
const config = require('../src/config');
const utils = require('../src/utils');

const search = (query, type) =>
  fetch(`${config.API_URL}/search?q=${query}&type=${type}`, {
    headers: {
      Authorization: 'Bearer BQCx2QR2FGVwffc5R7oFSI-_oXisjY6k7m1HxTsSDkI0e7f146FplZ0TqnS4PVqNp4Qt_SZqJe_vn4A'
    }
  })
    .then(utils.toJson)
    .catch((err) => err.message);

const searchArtists = (query) => search(query, 'artist');

const searchAlbums = (query) => search(query, 'album');

const searchTracks = (query) => search(query, 'track');

const searchPlaylists = (query) => search(query, 'playlist');

module.exports = {
  search,
  searchArtists,
  searchAlbums,
  searchTracks,
  searchPlaylists,
}
