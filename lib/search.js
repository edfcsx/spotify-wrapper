"use strict";

/* eslint-disable */
var config = require('../src/config');

var utils = require('../src/utils');

var search = function search(query, type) {
  return fetch("".concat(config.API_URL, "/search?q=").concat(query, "&type=").concat(type), {
    headers: {
      Authorization: 'Bearer BQCx2QR2FGVwffc5R7oFSI-_oXisjY6k7m1HxTsSDkI0e7f146FplZ0TqnS4PVqNp4Qt_SZqJe_vn4A'
    }
  }).then(utils.toJson)["catch"](function (err) {
    return err.message;
  });
};

var searchArtists = function searchArtists(query) {
  return search(query, 'artist');
};

var searchAlbums = function searchAlbums(query) {
  return search(query, 'album');
};

var searchTracks = function searchTracks(query) {
  return search(query, 'track');
};

var searchPlaylists = function searchPlaylists(query) {
  return search(query, 'playlist');
};

module.exports = {
  search: search,
  searchArtists: searchArtists,
  searchAlbums: searchAlbums,
  searchTracks: searchTracks,
  searchPlaylists: searchPlaylists
};