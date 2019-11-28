/* eslint-disable */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import {
  getAlbum,
  getAlbums,
  getAlbumTracks,
} from '../../src/album';

import { API_URL } from '../../src/config';

describe('Album', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have a getAlbums method', () => {
      expect(getAlbums).to.exist;
    })

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch function', () => {
      const album = getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy`);

      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTH');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTH`);
    });

    it('should return a JSON Data from the promise', () => {
      const album = getAlbum();
      album.then((data) => expect(data).to.be.eql({ album: 'name' }));
    });
  });

  describe('getAlbums', () => {
    it('should call fetch function', () => {
      const albums = getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const album = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTK']);
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTK`);

      const album2 = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTW']);
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTW`);
    });

    it('should return a JSON Data from the promise', () => {
      const album = getAlbums();
      album.then((data) => expect(data).to.be.eql({ album: 'name' }));
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch function', () => {
      const albumsTracks = getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const albumTracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`);

      const albumTracks2 = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTK');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTK/tracks`);
    });

    it('should return a JSON Data from the promise', () => {
      const albumTracks = getAlbumTracks();
      albumTracks.then((data) => expect(data).to.be.eql({ album: 'name' }));
    });
  });
});
