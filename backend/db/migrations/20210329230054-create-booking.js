"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Bookings", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Users" },
			},
			carId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Cars" },
			},
			startDate: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			endDate: {
				type: Sequelize.STRING,
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
		return queryInterface.dropTable("Bookings");
	},
};
