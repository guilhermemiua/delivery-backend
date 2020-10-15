module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('companies', 'company_category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'company_categories',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('companies', 'company_category_id');
  },
};
