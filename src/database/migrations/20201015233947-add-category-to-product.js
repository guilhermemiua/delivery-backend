module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'product_category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'product_categories',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('products', 'product_category_id');
  },
};
