/* eslint-disable */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
} from '../../src/search';

import { API_URL } from '../../src/config';

describe('Spotify Wrapper Searchs', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ test: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke testes', () => {
    it ('should exist the search method', () => {
      expect(search).to.exist;
    });

    it ('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it ('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it ('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it ('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.been.have.calledWith(`${API_URL}/search?q=Incubus&type=artist`);

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.been.have.calledWith(`${API_URL}/search?q=Incubus&type=album`);
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=artist,album`);
      });
    });

    it('should return a JSON Data from the promise', () => {
      const artists = search('Incubus', 'artist');
      artists.then((data) => expect(data).to.be.eql({ test: 'name' }));
    });
  });

  describe('Search Artists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=artist`);

      const artists2 = searchArtists('Extreme');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Extreme&type=artist`);
    });

    it('should return a JSON Data from the promise', () => {
      const artists = searchArtists('Incubus');
      artists.then((data) => expect(data).to.be.eql({ test: 'name' }));
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=album`);

      const albums2 = searchAlbums('Extreme');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Extreme&type=album`);
    });

    it('should return a JSON Data from the promise', () => {
      const albums = searchAlbums('Incubus');
      albums.then((data) => expect(data).to.be.eql({ test: 'name' }));
    });
  });

  describe('Search Playlists', () => {
    it('should call fetch function', () => {
      const playlist = searchPlaylists();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      const playlist = searchPlaylists('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}` + '/search?q=Incubus&type=playlist');

      const playlist2 = searchPlaylists('Extreme');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}` + '/search?q=Extreme&type=playlist');
    });

    it('should return a JSON Data from the promise', () => {
      const playlist = searchPlaylists('Incubus');
      playlist.then((data) => expect(data).to.be.eql({ test: 'name' }));
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}` + '/search?q=Incubus&type=track');

      const tracks2 = searchTracks('Extreme');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}` + '/search?q=Extreme&type=track');
    });

    it('should return a JSON Data from the promise', () => {
      const tracks = searchTracks('Incubus');
      tracks.then((data) => expect(data).to.be.eql({ test: 'name' }));
    });
  })
});
