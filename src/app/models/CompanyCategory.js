module.exports = (sequelize, DataTypes) => {
  const CompanyCategory = sequelize.define("CompanyCategory", {
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

  CompanyCategory.associate = (models) => {
    CompanyCategory.hasOne(models.Company, {
      as: "company",
      foreignKey: "company_category_id",
      targetKey: "id",
    });
  };

  return CompanyCategory;
};
