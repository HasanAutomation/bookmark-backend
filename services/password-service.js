const bcrypt = require('bcryptjs');
class PasswordService {
  async matchPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

const instance = new PasswordService();
module.exports = instance;
