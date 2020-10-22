const { Product, ProductImage } = require("../models");

class ProductController {
  async create(request, response) {
    try {
      const { companyId } = request;
      const { name, price, product_category_id } = request.body;

      if (!companyId) {
        return response.status(401).json({ message: "Empresa não enviado" });
      }

      const product = await Product.create({
        name,
        price,
        product_category_id,
        company_id: companyId,
      });

      return response.status(201).json(product);
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ message: "Erro na criação do produto" });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { name, price, product_category_id } = request.body;

      const product = await Product.update(
        {
          name,
          price,
          product_category_id,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      return response.status(201).json(product);
    } catch (error) {
      return response
        .status(401)
        .json({ message: "Erro na atualização do Produto" });
    }
  }

  async findAll(request, response) {
    const params = request.params;
    try {
      const products = await Product.findAll({
        where: {
          ...(params || {}),
        },
        include: [
          {
            attributes: ["path"],
            model: ProductImage,
            as: "productImages",
          },
        ],
      });

      return response.status(200).json(products);
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ message: "Error at Product Find All" });
    }
  }

  async getProductsPerCompany(request, response) {
    try {
      const { companyId } = request;

      if (!companyId) {
        return response.status(401).json({ message: "Empresa não enviado" });
      }

      const products = await Product.findAll({
        where: {
          company_id: companyId,
        },
        include: [
          {
            attributes: ["path"],
            model: ProductImage,
            as: "productImages",
          },
        ],
      });

      return response.status(200).json(products);
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ message: "Erro na busca dos produtos" });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const product = await Product.findByPk(Number(id), {
        include: [
          {
            attributes: ["path"],
            model: ProductImage,
            as: "productImages",
          },
        ],
      });

      if (!product) {
        return response.status(401).json({ message: "Produto não encontrado" });
      }

      return response.status(200).json(product);
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: "Erro na busca do produto" });
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
        message: "Deleted",
      });
    } catch (error) {
      return response
        .status(401)
        .json({ message: "Erro na remoção do produto" });
    }
  }
}

module.exports = new ProductController();
