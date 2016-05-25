const crypto = require('crypto');

const getHash = value => {
  const sha = crypto.createHmac('sha256', 'secretKey');

  sha.update(value);

  return sha.digest('hex');
};

module.exports = getHash;
