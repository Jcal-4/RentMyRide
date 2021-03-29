"use strict";
"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				type: Sequelize.STRING(30),
				allowNull: false,
				unique: true,
			},
			firstName: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			about: {
				type: Sequelize.STRING(300),
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			state: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			address: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			profileImageUrl: {
				type: Sequelize.STRING(300),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(256),
				allowNull: false,
				unique: true,
			},
			hashedPassword: {
				type: Sequelize.STRING.BINARY,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Users");
	},
};
