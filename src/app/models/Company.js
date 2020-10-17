const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    company_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    profile_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    trading_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_ddd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_online: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    has_delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    delivery_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });

  Company.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  Company.prototype.generateToken = function () {
    return jwt.sign({ companyId: this.id }, process.env.APP_SECRET);
  };

  Company.associate = (models) => {
    Company.belongsTo(models.CompanyCategory, {
      as: 'company_category',
      foreignKey: 'company_category_id',
      targetKey: 'id',
    });
    Company.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'company_id',
      targetKey: 'id',
    });
    Company.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'company_id',
      targetKey: 'id',
    });
    Company.hasOne(models.ProfileImage, {
      as: 'profile_image',
      foreignKey: 'profile_image_id',
      targetKey: 'id',
    });
  };

  return Company;
};
