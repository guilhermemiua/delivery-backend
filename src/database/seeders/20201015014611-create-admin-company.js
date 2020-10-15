const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('companies', [{
      trading_name: 'Empresa X',
      company_name: 'Empresa X',
      password: await bcrypt.hash('admin', 8),
      email: 'admin@admin.com',
      phone_ddd: '11',
      phone_number: '99955-2318',
      cnpj: '199647702319',
      street: 'Rua',
      number: 5,
      district: 'Centro',
      city: 'Londrina',
      state: 'PR',
      complement: '',
      zipcode: '08739490',
      latitude: '1',
      longitude: '1',
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('companies', {
      is_admin: true,
    }, {});
  },
};
