module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'order_review_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'order_reviews',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('orders', 'order_review_id');
  },
};
