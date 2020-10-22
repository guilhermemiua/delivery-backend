const {
  Company,
  CompanyCategory,
  Product,
  ProfileImage,
} = require('../models');
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
        delivery_price,
        has_delivery,
        company_category_id,
        password: passwordHashed,
      });

      return response.status(201).json(company);
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ message: 'Erro no cadastro da Empresa' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const {
        trading_name,
        company_name,
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
        delivery_price,
        has_delivery,
        company_category_id,
      } = request.body;

      const company = await Company.update(
        {
          trading_name,
          company_name,
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
          delivery_price,
          has_delivery,
          company_category_id,
        },
        {
          where: {
            id: Number(id),
          },
        },
      );

      return response.status(201).json(company);
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ message: 'Erro na atualização da Empresa' });
    }
  }

  async authenticate(request, response) {
    try {
      const { email, password } = request.body;

      const company = await Company.findOne({
        where: { email },
        subQuery: false,
        underscored: true,
        include: [
          {
            model: CompanyCategory,
            as: 'company_category',
          },
          {
            model: Product,
            as: 'products',
          },
          {
            attributes: ['id', 'name', 'path'],
            model: ProfileImage,
            as: 'profileImages',
          },
        ],
      });

      if (!company) {
        return response
          .status(401)
          .json({ message: 'Senha ou Email incorreto' });
      }

      if (!(await company.checkPassword(password))) {
        return response
          .status(401)
          .json({ message: 'Senha ou Email incorreto' });
      }

      return response
        .status(200)
        .json({ company, token: company.generateToken() });
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ message: 'Erro na autenticação da empresa' });
    }
  }

  async findAll(request, response) {
    try {
      const { offset, limit, ...params } = request.query;

      let companies;

      if (offset && limit) {
        companies = await Company.findAndCountAll({
          where: {
            is_admin: 0,
            ...(params || {}),
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
            {
              attributes: ['path'],
              model: ProfileImage,
              as: 'profileImages',
            },
          ],
        });
      } else {
        companies = await Company.findAll({
          where: {
            is_admin: 0,
            ...(params || {}),
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
            {
              attributes: ['path'],
              model: ProfileImage,
              as: 'profileImages',
            },
          ],
        });
      }

      return response.status(200).json(companies);
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ message: 'Erro na busca de empresas' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const company = await Company.findByPk(Number(id), {
        subQuery: false,
        underscored: true,
        include: [
          {
            model: CompanyCategory,
            as: 'company_category',
          },
          {
            model: Product,
            as: 'products',
          },
          {
            attributes: ['id', 'name', 'path'],
            model: ProfileImage,
            as: 'profileImages',
          },
        ],
      });

      if (!company) {
        return response.status(401).json({ message: 'Empresa não encontrada' });
      }

      return response.status(200).json(company);
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ message: 'Erro na busca da empresa' });
    }
  }
}

module.exports = new CompanyController();
