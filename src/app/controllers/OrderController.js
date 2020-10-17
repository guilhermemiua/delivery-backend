const { Order, OrderProduct, Company } = require('../models');

class OrderController {
  async create(request, response) {
    try {
      const {
        payment_type,
        is_delivery,
        products,
        company_id,
      } = request.body;

      if (!Array.isArray(products) && products.length > 0) {
        return response.status(401).json({ message: 'Nenhum produto enviado na ordem' });
      }

      const company = await Company.findByPk(company_id);

      if (!company) {
        return response.status(401).json({ message: 'Empresa não encontrada' });
      }

      const totalPrice = products.reduce((acc, product) => {
        return acc + product.price;
      });

      const order = await Order.create({
        payment_type,
        is_delivery,
        user_id: request.userId,
        company_id,
        total_price: totalPrice,
        status: 'waiting',
        shipping_price: is_delivery ? company.delivery_price : null,
      });

      await Promise.all(products.map(async (product) => {
        await OrderProduct.create({
          product_id: product.id,
          order_id: order.id,
        });
      }));

      return response.status(201).json(order);
    } catch (error) {
      return response.status(401).json({ message: 'Erro na criação de uma ordem' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const {
        status,
      } = request.body;

      const order = await Order.update({
        status,
      }, {
        where: {
          id: Number(id),
        },
      });

      return response.status(201).json(order);
    } catch (error) {
      return response.status(401).json({ message: 'Erro na atualização da ordem' });
    }
  }

  async findAll(request, response) {
    try {
      const orders = await Order.findAll();

      return response.status(200).json(orders);
    } catch (error) {
      return response.status(401).json({ message: 'Error na busca de ordems' });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const order = await Order.findByPk(Number(id));

      if (!order) {
        return response.status(401).json({ message: 'Order not found' });
      }

      return response.status(200).json(order);
    } catch (error) {
      return response.status(401).json({ message: 'Error na busca da ordem' });
    }
  }
}

module.exports = new OrderController();
