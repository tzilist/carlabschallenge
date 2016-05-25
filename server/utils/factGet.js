import request from 'request';
import client from './redisClient';

/**
* Checks whether interest is greater than or equal to 0.7
* @param {number} interest - number from the parsed body after sending a request to hook.io
**/

export function interestCheck(interest) {
  return interest >= 0.7;
}

/**
* After the interest level has been accepted, the fact is stored into redis under
* the list 'recentPickles'.
* It should be noted that only the fact is stored here and nothing else.
* @param {object} body - the response from hook.io
* @param {object} res - express response object
**/

export function store(body, res) {
  client.rpush(['recentPickles', body.fact], (pushError) => {
    if (pushError) throw pushError;
    res.send(body);
  });
}

/**
* This function makes a request to hook.io for pickle facts. The body is then parsed
* and the interest level is the checked. Depending on the interest level, the fact is either
* stored into redis or another request is made back to the server recursively. This function will
* run until an appropriate response with an adequate interest level is sent. It should be noted that
* while the server does sometimes return an error (status 500), since the interest is still part of
* the response object, this function works. Should the server send a modified 'error' object, this
* would need to be modified.
* @param {object} req - express request object
* @param {object} res - express response object
**/

export default function factGet(req, res) {
  request('https://hook.io/samhavens/pickle', (err, response, body) => {
    if (err) throw err;
    const bodyParsed = JSON.parse(body);
    return interestCheck(bodyParsed.interesting) ? store(bodyParsed, res) : factGet(req, res);
  });
}
