/* eslint-disable */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');


describe('Spotify Wrapper Searchs', () => {
  let spotify;
  let fetchedStub;

  beforeEach(() => {
    spotify = new SpotifyWrapper({ token: 'foo' });
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ test: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke testes', () => {
    it('should exist the searchAlbums method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('Search Artists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}/search?q=Incubus&type=artist`);

      const artists2 = spotify.search.artists('Extreme');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}/search?q=Extreme&type=artist`);
    });

    it('should return a JSON Data from the promise', () => {
      const artists = spotify.search.artists('Incubus');
      artists.then((data) => expect(data).to.be.eql({ test: 'name' }));
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      const albums = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}/search?q=Incubus&type=album`);

      const albums2 = spotify.search.albums('Extreme');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}/search?q=Extreme&type=album`);
    });

    it('should return a JSON Data from the promise', () => {
      const albums = spotify.search.albums('Incubus');
      albums.then((data) => expect(data).to.be.eql({ test: 'name' }));
    });
  });

  describe('Search Playlists', () => {
    it('should call fetch function', () => {
      const playlist = spotify.search.playlists();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      const playlist = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}` + '/search?q=Incubus&type=playlist');

      const playlist2 = spotify.search.playlists('Extreme');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}` + '/search?q=Extreme&type=playlist');
    });

    it('should return a JSON Data from the promise', () => {
      const playlist = spotify.search.playlists('Incubus');
      playlist.then((data) => expect(data).to.be.eql({ test: 'name' }));
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.tracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      const tracks = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}/search?q=Incubus&type=track`);

      const tracks2 = spotify.search.tracks('Extreme');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}/search?q=Extreme&type=track`);
    });

    it('should return a JSON Data from the promise', () => {
      const tracks = spotify.search.tracks('Incubus');
      tracks.then((data) => expect(data).to.be.eql({ test: 'name' }));
    });
  })
});
