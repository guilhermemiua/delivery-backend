const { Product, Company } = require('../models');

class ProductController {
  async create(request, response) {
    try {
      const {
        name,
        price,
        company_id,
      } = request.body;

      const product = await Product.create({
        name,
        price,
        company_id,
      });

      return response.status(201).json(product);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Product Create' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const {
        name,
        price,
      } = request.body;

      const product = await Product.update({
        name,
        price,
      }, {
        where: {
          id: Number(id),
        },
      });

      return response.status(201).json(product);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Product Update' });
    }
  }

  async findAll(request, response) {
    try {
      const products = await Product.findAll();

      return response.status(200).json(products);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Product Find All' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const product = await Product.findByPk(Number(id));

      if (!product) {
        return response.status(401).json({ message: 'Product not found' });
      }

      return response.status(200).json(product);
    } catch (error) {
      return response.status(401).json({ message: 'Error at Product Find By Id' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await Product.destroy({
        where: {
          id: Number(id),
        },
      });

      return response.status(200).json({
        message: 'Deleted',
      });
    } catch (error) {
      return response.status(401).json({ message: 'Error at Product Delete' });
    }
  }
}

module.exports = new ProductController();
