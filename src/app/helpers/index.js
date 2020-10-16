const bcrypt = require('bcryptjs');

function encryptPassword(password) {
  return bcrypt.hash(password, 8);
}

module.exports = {
  encryptPassword,
};
