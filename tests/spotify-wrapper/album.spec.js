/* eslint-disable */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');


describe('Album', () => {
  let spotify;
  let fetchedStub;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });

    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have a getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch function', () => {
      const album = spotify.album.getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}/albums/4aawyAB9vmqN3uQ7FjRGTy`);

      const album2 = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTH');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}/albums/4aawyAB9vmqN3uQ7FjRGTH`);
    });

    it('should return a JSON Data from the promise', () => {
      const album = spotify.album.getAlbum();
      album.then((data) => expect(data).to.be.eql({ album: 'name' }));
    });
  });

  describe('getAlbums', () => {
    it('should call fetch function', () => {
      const albums = spotify.album.getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const album = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTK']);
      expect(fetchedStub).to.have.been
        .calledWith(`${spotify.apiURL}/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTK`);

      const album2 = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTW']);
      expect(fetchedStub).to.have.been
        .calledWith(`${spotify.apiURL}/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTW`);
    });

    it('should return a JSON Data from the promise', () => {
      const album = spotify.album.getAlbums();
      album.then((data) => expect(data).to.be.eql({ album: 'name' }));
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch function', () => {
      const albumsTracks = spotify.album.getTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const albumTracks = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`);

      const albumTracks2 = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTK');
      expect(fetchedStub).to.have.been.calledWith(`${spotify.apiURL}/albums/4aawyAB9vmqN3uQ7FjRGTK/tracks`);
    });

    it('should return a JSON Data from the promise', () => {
      const albumTracks = spotify.album.getTracks();
      albumTracks.then((data) => expect(data).to.be.eql({ album: 'name' }));
    });
  });
});
