/* eslint-disable */
const config = require('./config');
const utils = require('./utils');

const getAlbum = id => fetch(`${config.API_URL}/albums/${id}`).then(utils.toJson);

const getAlbums = ids => fetch(`${config.API_URL}/albums/?ids=${ids}`).then(utils.toJson);

const getAlbumTracks = id => fetch(`${config.API_URL}/albums/${id}/tracks`).then(utils.toJson);

module.exports = {
  getAlbum,
  getAlbums,
  getAlbumTracks,
}
