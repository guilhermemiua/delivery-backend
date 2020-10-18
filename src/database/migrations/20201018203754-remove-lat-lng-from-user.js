module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('addresses', 'latitude'),
      queryInterface.removeColumn('addresses', 'longitude'),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('addresses', 'latitude', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.addColumn('addresses', 'longitude', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },
};
