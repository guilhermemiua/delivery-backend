module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });

  OrderProduct.associate = (models) => {
    OrderProduct.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
      targetKey: 'id',
    });
    OrderProduct.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'order_id',
      targetKey: 'id',
    });
  };

  return OrderProduct;
};
