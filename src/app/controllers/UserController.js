const { User, Address } = require('../models');

class UserController {
  async register(request, response) {
    try {
      const {
        email,
        password,
        cpf,
        phone_ddd,
        phone_number,
        street,
        number,
        district,
        city,
        state,
        complement,
        zipcode,
        latitude,
        longitude,
      } = request.body;

      const user = await User.create({
        email,
        password,
        cpf,
        phone_ddd,
        phone_number,
      });

      const address = await Address.create({
        user_id: user.id,
        street,
        number,
        district,
        city,
        state,
        complement,
        zipcode,
        latitude,
        longitude,
      });

      return response.status(201).json({ user, address });
    } catch (error) {
      return response.status(401).json({ message: 'Error at User Register' });
    }
  }

  async authenticate(request, response) {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ where: { email } });

      // User not found
      if (!user) {
        return response.status(401).json({ message: 'User not found' });
      }

      // Incorrect password
      if (!(await user.checkPassword(password))) {
        return response.status(401).json({ message: 'Incorrect password' });
      }

      return response.status(200).json({ user, token: user.generateToken() });
    } catch (error) {
      return response.status(401).json({ message: 'Error at User Authentication' });
    }
  }
}

module.exports = new UserController();
