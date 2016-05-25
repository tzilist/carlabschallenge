/* eslint no-undef:0 */

import expect from 'expect';
import request from 'request';
import { interestCheck, factGet } from '../server/utils/factGet';


describe('/fact', () => {
  describe('interestCheck', () => {
    it('should return true when interest is above or equal to 0.7', () => {
      expect(interestCheck(0.7)).toEqual(true);
      expect(interestCheck(0.9)).toEqual(true);
    });
    it('should return false when interest is below 0.7', () => {
      expect(interestCheck(0.6999999999999)).toEqual(false);
      expect(interestCheck(0)).toEqual(false);
    });
  });

  describe('fact', () => {
    it('should return an object with correct keys', () => {
      request('http://localhost:8080/fact', (error, response, body) => {
        const parsedBody = JSON.parse(body);
        expect(parsedBody).toBeA('object');
        expect(parsedBody.fact).toExist();
        expect(parsedBody.status).toExist();
        expect(parsedBody.message).toExist();
        expect(parsedBody.interesting).toExist();
      });
    });
  });
});
