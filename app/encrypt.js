const crypto = require('crypto');

const encrypt = value => {
  const sha = crypto.createHmac('sha256', 'secretKey');

  sha.update(value);

  return sha.digest('hex');
};

module.exports = encrypt;
