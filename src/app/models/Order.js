module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order_review_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payment_type: {
      type: DataTypes.ENUM('credit_card', 'money'),
      allowNull: false,
    },
    is_delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shipping_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('waiting', 'confirmed', 'cancelled'),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    Order.belongsTo(models.Company, {
      as: 'company',
      foreignKey: 'company_id',
      targetKey: 'id',
    });
    Order.hasOne(models.OrderReview, {
      as: 'order_review',
      foreignKey: 'order_review_id',
      targetKey: 'id',
    });
    Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
    });
  };

  return Order;
};
