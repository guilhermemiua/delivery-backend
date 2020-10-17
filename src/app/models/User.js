const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    profile_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
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
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  }, {
    hooks: {
      beforeSave: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 8);
        }
      },
    },
  });

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.generateToken = function () {
    return jwt.sign({ userId: this.id }, process.env.APP_SECRET);
  };

  User.associate = (models) => {
    User.hasMany(models.Address, {
      as: 'addresses',
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    User.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    User.hasOne(models.ProfileImage, {
      as: 'profile_image',
      foreignKey: 'profile_image_id',
      targetKey: 'id',
    });
  };

  return User;
};
