module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('orders', 'street', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('orders', 'number', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('orders', 'district', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('orders', 'city', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('orders', 'state', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('orders', 'complement', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('orders', 'zipcode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('orders', 'street'),
      queryInterface.removeColumn('orders', 'number'),
      queryInterface.removeColumn('orders', 'district'),
      queryInterface.removeColumn('orders', 'city'),
      queryInterface.removeColumn('orders', 'state'),
      queryInterface.removeColumn('orders', 'complement'),
      queryInterface.removeColumn('orders', 'zipcode'),
    ]);
  },
};
