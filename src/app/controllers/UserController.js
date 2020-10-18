const { User, Address } = require('../models');
const { encryptPassword } = require('../helpers');

class UserController {
  async create(request, response) {
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
      } = request.body;

      const passwordHashed = await encryptPassword(password);

      const user = await User.create({
        email,
        cpf,
        phone_ddd,
        phone_number,
        password: passwordHashed,
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
      });

      return response.status(201).json({ user, address });
    } catch (error) {
      return response.status(401).json({ message: 'Error at User Register' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const {
        email,
        cpf,
        phone_ddd,
        phone_number,
        password,
      } = request.body;

      const passwordHashed = await encryptPassword(password);

      const user = await User.update(
        {
          email,
          cpf,
          phone_ddd,
          phone_number,
          password: passwordHashed,
        },
        {
          where: {
            id: Number(id),
          },
        },
      );

      return response.status(201).json(user);
    } catch (error) {
      return response.status(401).json({ message: 'Error at User Update' });
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
      console.log(error);
      return response.status(401).json({ message: 'Error at User Authentication' });
    }
  }
}

module.exports = new UserController();
