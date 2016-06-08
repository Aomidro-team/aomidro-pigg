const crypto = require('crypto');
const config = require('config');

const encrypt = value => {
  const sha = crypto.createHmac('sha256', config.get('secretKey'));

  sha.update(value);

  return sha.digest('hex');
};

module.exports = encrypt;
