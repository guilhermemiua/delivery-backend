module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'profile_image_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'profile_images',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'profile_image_id');
  },
};
