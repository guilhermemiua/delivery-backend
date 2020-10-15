const { Company, Address } = require('../models');

class CompanyController {
  async register(request, response) {
    try {
      const {
        trading_name,
        company_name,
        email,
        password,
        cnpj,
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

      const company = await Company.create({
        trading_name,
        company_name,
        email,
        password,
        cnpj,
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
      });

      return response.status(201).json({ company });
    } catch (error) {
      return response.status(401).json({ message: 'Error at Company Register' });
    }
  }

  async authenticate(request, response) {
    try {
      const { email, password } = request.body;

      const company = await Company.findOne({ where: { email } });

      // Company not found
      if (!company) {
        return response.status(401).json({ message: 'Company not found' });
      }

      // Incorrect password
      if (!(await company.checkPassword(password))) {
        return response.status(401).json({ message: 'Incorrect password' });
      }

      return response.status(200).json({ company, token: company.generateToken() });
    } catch (error) {
      return response.status(401).json({ message: 'Error at Company Authentication' });
    }
  }

  async findAll(request, response) {
    try {
      const { offset, limit } = request.query;

      let companies;

      if (offset && limit) {
        companies = await Company.findAndCountAll({
          offset: Number(offset),
          limit: Number(limit),
        });
      } else {
        companies = await Company.findAll({});
      }

      return response.status(200).json(companies);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Company Find All' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const company = await Company.findById(Number(id));

      if (!company) {
        return response.status(401).json({ message: 'Company not found' });
      }

      return response.status(200).json(company);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Company Find By Id' });
    }
  }
}

module.exports = new CompanyController();
