'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
			"Bookings",
			[
				{
					userId: 2,
          carId: 1,
          startDate: "04/15/2021",
          endDate: "04/17/2021",
				},
			],
			{}
		);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Bookings", null, {});
  }
};
