const { Company, CompanyCategory, Product } = require('../models');
const { encryptPassword } = require('../helpers');

class CompanyController {
  async create(request, response) {
    try {
      const {
        trading_name,
        company_name,
        email,
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
        delivery_price,
        has_delivery,
        company_category_id,
        password,
      } = request.body;

      const passwordHashed = await encryptPassword(password);

      const company = await Company.create({
        trading_name,
        company_name,
        email,
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
        delivery_price,
        has_delivery,
        company_category_id,
        password: passwordHashed,
      });

      return response.status(201).json(company);
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Error at Company Register' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
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
        delivery_price,
        has_delivery,
        company_category_id,
      } = request.body;

      const passwordHashed = await encryptPassword(password);

      const company = await Company.update({
        trading_name,
        company_name,
        email,
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
        delivery_price,
        has_delivery,
        company_category_id,
        password: passwordHashed,
      }, {
        where: {
          id: Number(id),
        },
      });

      return response.status(201).json(company);
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Error at Company Update' });
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
          where: {
            is_admin: 0,
          },
          offset: Number(offset),
          limit: Number(limit),
          include: [
            {
              model: CompanyCategory,
              as: 'company_category',
            },
            {
              model: Product,
              as: 'products',
            },
          ],
        });
      } else {
        companies = await Company.findAll({
          where: {
            is_admin: 0,
          },
          include: [
            {
              model: CompanyCategory,
              as: 'company_category',
            },
            {
              model: Product,
              as: 'products',
            },
          ],
        });
      }

      return response.status(200).json(companies);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Company Find All' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const company = await Company.findByPk(Number(id), {
        include: [
          {
            model: CompanyCategory,
            as: 'company_category',
          },
          {
            model: Product,
            as: 'products',
          },
        ],
      });

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
