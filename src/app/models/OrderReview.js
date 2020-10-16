module.exports = (sequelize, DataTypes) => {
  const OrderReview = sequelize.define('OrderReview', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
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

  OrderReview.associate = (models) => {
    OrderReview.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'order_review_id',
      targetKey: 'id',
    });
  };

  return OrderReview;
};
