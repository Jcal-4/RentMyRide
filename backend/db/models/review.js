"use strict";
module.exports = (sequelize, DataTypes) => {
	const Review = sequelize.define(
		"Review",
		{
			authorId: { type: DataTypes.INTEGER, allowNull: false },
			carId: { type: DataTypes.INTEGER, allowNull: false },
			title: {type: DataTypes.STRING, allowNull: false},
			description: {type: DataTypes.STRING, allowNull: false},
			rating: { type: DataTypes.INTEGER, allowNull: false },
			pictureUrl: {type: DataTypes.STRING, allowNull: true},
		},
		{}
	);
	Review.associate = function (models) {
		Review.belongsTo(models.User, {foreignKey: "authorId"})
		Review.belongsTo(models.Car, {foreignKey: "carId"})
	};
	return Review;
};
