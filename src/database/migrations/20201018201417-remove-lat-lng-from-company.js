module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('companies', 'latitude'),
      queryInterface.removeColumn('companies', 'longitude'),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('companies', 'latitude', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.addColumn('companies', 'longitude', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },
};
