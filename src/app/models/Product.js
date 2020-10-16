module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Company, {
      as: 'company',
      foreignKey: 'company_id',
      targetKey: 'id',
    });
    Product.belongsTo(models.ProductCategory, {
      as: 'product_category',
      foreignKey: 'product_category_id',
      targetKey: 'id',
    });
    Product.hasOne(models.ProductImage, {
      as: 'product_image',
      foreignKey: 'product_image_id',
      targetKey: 'id',
    });
  };

  return Product;
};
