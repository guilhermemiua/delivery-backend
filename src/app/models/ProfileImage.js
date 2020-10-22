module.exports = (sequelize, DataTypes) => {
  const ProfileImage = sequelize.define('ProfileImage', {
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
    path: {
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

  ProfileImage.associate = (models) => {
    ProfileImage.hasOne(models.Company, {
      as: 'company',
      foreignKey: 'profile_image_id',
      targetKey: 'id',
    });
    ProfileImage.hasOne(models.User, {
      as: 'user',
      foreignKey: 'profile_image_id',
      targetKey: 'id',
    });
  };

  return ProfileImage;
};
