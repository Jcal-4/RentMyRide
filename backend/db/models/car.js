"use strict";
module.exports = (sequelize, DataTypes) => {
	const Car = sequelize.define(
		"Car",
		{
			userId: { type: DataTypes.INTEGER, allowNull: false },
			carMake: { type: DataTypes.STRING, allowNull: false },
			carModel: { type: DataTypes.STRING, allowNull: false },
			carYear: { type: DataTypes.INTEGER, allowNull: false },
			pricePerDay: { type: DataTypes.INTEGER, allowNull: false },
			carImage: { type: DataTypes.STRING, allowNull: false },
			countryName: { type: DataTypes.STRING, allowNull: false },
			stateName: { type: DataTypes.STRING, allowNull: false },
			cityName: { type: DataTypes.STRING, allowNull: false },
			address: { type: DataTypes.STRING, allowNull: false },
			seats: { type: DataTypes.INTEGER, allowNull: false },
			electric: { type: DataTypes.STRING, allowNull: false },
			autonomous: { type: DataTypes.STRING, allowNull: false },
			roadsideAssistance: { type: DataTypes.STRING, allowNull: false },
		},
		{}
	);
	Car.associate = function (models) {
		Car.belongsTo(models.User, {foreignKey: "userId"})
    Car.hasMany(models.Review, {foreignKey: "carId"})
		Car.hasMany(models.Booking, {foreignKey: "carId"})
	};
	return Car;
};
