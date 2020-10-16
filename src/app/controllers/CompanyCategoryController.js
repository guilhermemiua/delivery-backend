const { CompanyCategory } = require('../models');

class CompanyCategoryController {
  async create(request, response) {
    try {
      const {
        name,
      } = request.body;

      const companyCategory = await CompanyCategory.create({
        name,
      });

      return response.status(201).json(companyCategory);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Company Category Create' });
    }
  }

  async findAll(request, response) {
    try {
      const companyCategories = await CompanyCategory.findAll();

      return response.status(200).json(companyCategories);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Company Category Find All' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const companyCategory = await CompanyCategory.findByPk(Number(id));

      if (!companyCategory) {
        return response.status(401).json({ message: 'Company Category not found' });
      }

      return response.status(200).json(companyCategory);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Company Category Find By Id' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await CompanyCategory.destroy({
        where: {
          id: Number(id),
        },
      });

      return response.status(200).json({
        message: 'Deleted',
      });
    } catch (error) {
      if (error.message.indexOf('companies_company_category_id_foreign')) {
        return response.status(401).json({ message: 'Esta categoria já está sendo usada por uma Empresa' });
      }

      return response.status(401).json({ message: 'Error at Company Category Delete' });
    }
  }
}

module.exports = new CompanyCategoryController();
