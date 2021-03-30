"use strict";
module.exports = (sequelize, DataTypes) => {
	const Booking = sequelize.define(
		"Booking",
		{
			userId: {type: DataTypes.INTEGER, allowNull: false},
			carId: {type: DataTypes.INTEGER, allowNull: false},
			startDate: {type: DataTypes.STRING, allowNull: false},
			endDate: {type: DataTypes.STRING, allowNull: false},
		},
		{}
	);
	Booking.associate = function (models) {
		Booking.belongsTo(models.User, {foreignKey: "userId"})
		Booking.belongsTo(models.Car, {foreignKey: "carId"})
	};
	return Booking;
};
