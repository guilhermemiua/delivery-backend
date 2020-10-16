const { ProductCategory } = require('../models');

class ProductCategoryController {
  async create(request, response) {
    try {
      const {
        name,
      } = request.body;

      const productCategory = await ProductCategory.create({
        name,
      });

      return response.status(201).json(productCategory);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Product Category Create' });
    }
  }

  async findAll(request, response) {
    try {
      const productCategories = await ProductCategory.findAll();

      return response.status(200).json(productCategories);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Product Category Find All' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const productCategory = await ProductCategory.findByPk(Number(id));

      if (!productCategory) {
        return response.status(401).json({ message: 'Product Category not found' });
      }

      return response.status(200).json(productCategory);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Product Category Find By Id' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await ProductCategory.destroy({
        where: {
          id: Number(id),
        },
      });

      return response.status(200).json({
        message: 'Deleted',
      });
    } catch (error) {
      if (error.message.indexOf('products_product_category_id_foreign')) {
        return response.status(401).json({ message: 'Esta categoria já está sendo usada por um Produto' });
      }

      return response.status(401).json({ message: 'Error at Product Category Delete' });
    }
  }
}

module.exports = new ProductCategoryController();
