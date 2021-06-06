const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Car } = require("../../db/models");
const { User } = require("../../db/models");
const { Review } = require("../../db/models");

// everything car related api will go here to this file in the backend

// grab all the cars so we are able to render them out anywhere on the page
router.get(
	"/car",
	asyncHandler(async (req, res) => {
		// do a query for all of the cars in the db
		const cars = await Car.findAll({
			include: [User, Review],
		});
		res.send(cars);
	})
);

// grab a car by id
router.get("/car/:carId", asyncHandler(async (req, res) => {
	const car = await Car.findByPk(req.params.carId, {
		include: [User, Review]
	})

	res.send(car)
}))

router.delete(
	"/car/:carId",
	asyncHandler(async (req, res, next) => {
		const carId = req.params.carId;
		const car = await Car.findByPk(carId);
		await car.destroy();
		res.json({ message: "successful" });
	})
);

// grab cars where certain location
router.post(
	"/locations",
	asyncHandler(async (req, res) => {
		// do a query for all of the cars in the db with the cities matching the passed in info
		const cars = await Car.findAll({
			where: {
				cityName: req.body.cityName,
			},
		});

		res.send(cars);
	})
);



module.exports = router;
