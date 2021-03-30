"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			about: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			profileImageUrl: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			defaultScope: {
				attributes: {
					exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
				},
			},
			scopes: {
				// when querying these will be exempt from showing up
				currentUser: {
					attributes: { exclude: ["hashedPassword"] },
				},
				loginUser: {
					attributes: {},
				},
			},
		}
	);
	// will return an object with the User instance that is safe to save in a JWT
	User.prototype.toSafeObject = function () {
		// remember, this cannot be an arrow function
		const { id, username, email } = this; // context will be the User instance
		return { id, username, email };
	};
	User.prototype.validatePassword = function (password) {
		return bcrypt.compareSync(password, this.hashedPassword.toString());
	};
	User.getCurrentUserById = async function (id) {
		return await User.scope("currentUser").findByPk(id);
	};
	User.login = async function ({ credential, password }) {
		const { Op } = require("sequelize");
		const user = await User.scope("loginUser").findOne({
			where: {
				[Op.or]: {
					username: credential,
					email: credential,
				},
			},
		});
		if (user && user.validatePassword(password)) {
			return await User.scope("currentUser").findByPk(user.id);
		}
	};
	User.signup = async function ({ username, email, password }) {
		const hashedPassword = bcrypt.hashSync(password);
		const user = await User.create({
			username,
			email,
			hashedPassword,
		});
		return await User.scope("currentUser").findByPk(user.id);
	};
	User.associate = function (models) {
		User.hasMany(models.Car, {foreignKey: "userId"})
		User.hasMany(models.Review, {foreignKey: "authorId"})
		User.hasMany(models.Booking, {foreignKey: "userId"})
	};
	return User;
};
