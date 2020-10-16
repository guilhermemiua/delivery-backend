module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Order', {
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });

  Company.associate = (models) => {
    // Company.belongsTo(models.User, {
    //   as: 'user',
    //   foreignKey: 'user_id',
    //   targetKey: 'id',
    // });
    // Company.belongsTo(models.Company, {
    //   as: 'company',
    //   foreignKey: 'company_id',
    //   targetKey: 'id',
    // });
    Company.hasOne(models.OrderReview, {
      as: 'order_review',
      foreignKey: 'order_review_id',
      targetKey: 'id',
    });
  };

  return Company;
};
