"use strict";

/* eslint-disable */
var config = require('./config');

var utils = require('./utils');

var getAlbum = function getAlbum(id) {
  return fetch("".concat(config.API_URL, "/albums/").concat(id)).then(utils.toJson);
};

var getAlbums = function getAlbums(ids) {
  return fetch("".concat(config.API_URL, "/albums/?ids=").concat(ids)).then(utils.toJson);
};

var getAlbumTracks = function getAlbumTracks(id) {
  return fetch("".concat(config.API_URL, "/albums/").concat(id, "/tracks")).then(utils.toJson);
};

module.exports = {
  getAlbum: getAlbum,
  getAlbums: getAlbums,
  getAlbumTracks: getAlbumTracks
};