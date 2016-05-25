import client from './redisClient';

/**
* Checks the current length of our redis list 'recentPickles'
* A request for the most recent pickle facts is sent by comparing our list
* length vs. the parameter requested. Should something occur where we only have, say,
* 3 items in our list and the most recent 100 pickle facts are requested, only 3 facts
* will be sent back. The redis client handles this for us
* @param {object} req - express request object
* @param {object} res - express response object
**/

function getRecent(req, res) {
  // check for number instead of string
  const number = parseInt(req.params.number);
  if (isNaN(number)) {
    return res.status(500).send('Please input a number');
  }

  client.llen('recentPickles', (errLen, length) => {
    if (errLen) throw errLen;
    const start = length - number;
    client.lrange('recentPickles', start, -1, (errRange, reply) => {
      if (errRange) throw errRange;
      res.send(reply);
    });
  });
}

export default getRecent;
