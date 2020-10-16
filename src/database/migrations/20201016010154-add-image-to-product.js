module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'product_image_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'product_images',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('products', 'product_image_id');
  },
};
