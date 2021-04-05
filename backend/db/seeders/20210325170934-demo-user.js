"use strict";
const faker = require("faker"); // allows us to create fake data for testing purposes
const bcrypt = require("bcryptjs"); // allows us to generate the hashes password

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "demo@user.com",
					username: "DemoUser",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "Demo",
					lastName: "User",
					about: "I am here to rent my ride",
					city: "Los Angeles",
					state: "California",
					address: "4151 2nd Ave",
					profileImageUrl:
						"https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png",
				},
				{
					email: " something@mail.com",
					username: "Batman",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "Bat",
					lastName: "Man",
					about: "Batmobile is ready to be rented",
					city: "New York",
					state: "New York",
					address: "675 Water St",
					profileImageUrl:
						"https://i.pinimg.com/originals/46/00/57/46005760e0544bcadaaee9b92387e8b8.png",
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Users",
			{
				username: { [Op.in]: ["DemoUser", "FakeUser1", "FakeUser2"] },
			},
			{}
		);
	},
};
