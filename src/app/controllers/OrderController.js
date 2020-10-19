const {
  Address,
  Order,
  OrderProduct,
  User,
  Company,
  Product,
  sequelize,
  ProductImages,
} = require("../models");

class OrderController {
  async create(request, response) {
    const transaction = await sequelize.transaction();

    try {
      const {
        payment_type,
        is_delivery,
        products,
        company_id,
        address_id,
      } = request.body;

      if (!Array.isArray(products) && products.length > 0) {
        return response
          .status(401)
          .json({ message: "Nenhum produto enviado na ordem" });
      }

      const company = await Company.findByPk(company_id);

      if (!company) {
        return response.status(401).json({ message: "Empresa não encontrada" });
      }

      const totalPrice = products.reduce((acc, product) => {
        return acc + product.price;
      }, 0);

      const address = await Address.findByPk(address_id);

      if (!company) {
        return response
          .status(401)
          .json({ message: "Endereço não encontrado" });
      }

      const order = await Order.create(
        {
          payment_type,
          is_delivery: !!(
            is_delivery &&
            company.has_delivery &&
            company.delivery_price
          ),
          user_id: request.userId,
          company_id,
          total_price: totalPrice,
          status: "waiting",
          street: address.street,
          number: address.number,
          district: address.district,
          city: address.city,
          state: address.state,
          complement: address.complement,
          zipcode: address.zipcode,
          shipping_price:
            is_delivery && company.has_delivery && company.delivery_price
              ? company.delivery_price
              : 0,
        },
        { transaction }
      );

      await Promise.all(
        products.map(async (product) => {
          await OrderProduct.create(
            {
              product_id: product.id,
              order_id: order.id,
              quatity: product.quantity,
            },
            { transaction }
          );
        })
      );

      await transaction.commit();

      return response.status(201).json(order);
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return response
        .status(401)
        .json({ message: "Erro na criação do pedido" });
    }
  }

  async updateStatus(request, response) {
    try {
      const { id } = request.params;
      const { status } = request.body;

      const order = await Order.update(
        {
          status,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      return response.status(201).json(order);
    } catch (error) {
      return response
        .status(401)
        .json({ message: "Erro na atualização do status pedido" });
    }
  }

  async getOrdersPerCompany(request, response) {
    try {
      const { companyId } = request;

      if (!companyId) {
        return response.status(401).json({ message: "Empresa não enviado" });
      }

      const orders = await Order.findAll({
        include: [
          {
            model: OrderProduct,
            as: "order_products",
            include: {
              model: Product,
              as: "product",
              include: [
                {
                  model: ProductImages,
                  as: "product_images",
                },
              ],
            },
          },
          {
            model: User,
            as: "user",
          },
        ],
        where: {
          company_id: companyId,
        },
      });

      return response.status(200).json(orders);
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ message: "Erro na busca dos pedidos" });
    }
  }

  async findAll(request, response) {
    try {
      const orders = await Order.findAll();

      return response.status(200).json(orders);
    } catch (error) {
      return response.status(401).json({ message: "Erro na busca de pedidos" });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const order = await Order.findByPk(Number(id));

      if (!order) {
        return response.status(401).json({ message: "Pedido não encontrado" });
      }

      return response.status(200).json(order);
    } catch (error) {
      return response.status(401).json({ message: "Erro na busca do pedido" });
    }
  }
}

module.exports = new OrderController();
