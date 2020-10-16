module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
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

  ProductCategory.associate = (models) => {
    ProductCategory.hasOne(models.Product, {
      as: 'product',
      foreignKey: 'product_category_id',
      targetKey: 'id',
    });
  };

  return ProductCategory;
};
