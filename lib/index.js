"use strict";

var _require = require('./search'),
    search = _require.search,
    searchAlbums = _require.searchAlbums,
    searchArtists = _require.searchArtists,
    searchPlaylists = _require.searchPlaylists,
    searchTracks = _require.searchTracks;

var _require2 = require('./album'),
    getAlbum = _require2.getAlbum,
    getAlbums = _require2.getAlbums,
    getAlbumTracks = _require2.getAlbumTracks;

module.exports = {
  search: search,
  searchAlbums: searchAlbums,
  searchArtists: searchArtists,
  searchPlaylists: searchPlaylists,
  searchTracks: searchTracks,
  getAlbum: getAlbum,
  getAlbums: getAlbums,
  getAlbumTracks: getAlbumTracks
};