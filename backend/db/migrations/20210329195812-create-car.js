"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Cars", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
        references:{model: "Users"}
			},
			carMake: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			carModel: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			carYear: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			pricePerDay: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			carImage: {
				type: Sequelize.STRING(500),
				allowNull: false,
			},
			countryName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			stateName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cityName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			seats: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			electric: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			autonomous: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			roadsideAssistance: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Cars");
	},
};
