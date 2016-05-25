/* eslint no-undef: 0 */

import request from 'request';
import expect from 'expect';

describe('/recent', () => {
  // this test assumes there are items in the redis database
  it('should return correct number of recent items', () => {
    request('http://localhost:8080/recent/1', (error, response, body) => {
      const resp = JSON.parse(body);
      expect(resp).toBeAn('array');
      expect(resp.length).toEqual(1);
    });
    request('http://localhost:8080/recent/4', (error, response, body) => {
      const resp = JSON.parse(body);
      expect(resp).toBeAn('array');
      expect(resp.length).toEqual(4);
    });
  });
  it('should return an error when non string is passed through', () => {
    request('http://localhost:8080/recent/a', (error, response, body) => {
      expect(body).toBeA('string');
      expect(body).toEqual('Please input a number');
    });
  });
});
