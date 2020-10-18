module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('order_products', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('order_products', 'quantity');
  },
};
