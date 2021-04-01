const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Car } = require("../../db/models");
const { User } = require("../../db/models");

// everything car related api will go here to this file in the backend

// grab all the cars so we are able to render them out anywhere on the page
router.get(
	"/car",
	asyncHandler(async (req, res) => {
		// do a query for all of the cars in the db
		const cars = await Car.findAll({
			include: User,
		});
		console.log(cars);
		res.send(cars);
	})
);

router.delete(
	"/car/:carId",
	asyncHandler(async (req, res, next) => {
		const carId = req.params.carId;
		const car = await Car.findByPk(carId);
		await car.destroy();
		res.json({ message: "successful" });
	})
);

module.exports = router;
