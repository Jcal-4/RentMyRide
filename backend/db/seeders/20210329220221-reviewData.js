'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
			"Reviews",
			[
				{
					authorId: 1,
          carId: 1,
          title: "Excellent Car!",
          description: "I would high recommend. This was the best car I have ever rented!",
          rating: 5,
				},
			],
			{}
		);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Reviews", null, {});
  }
};
