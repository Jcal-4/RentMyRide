const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Car } = require("../../db/models");

// everything car related api will go here to this file in the backend

// grab all the cars so we are able to render them out anywhere on the page
router.get(
	"/car",
	asyncHandler(async (req, res) => {
		// do a query for all of the cars in the db
		const cars = await Car.findAll();
		console.log(cars);
		res.send(cars);
	})
);

router.delete(
	"/:carId",
	asyncHandler(async (req, res, next) => {
		const carId = req.params.carId;
		console.log(req.params);
		console.log(
			"***************",
			carId,
			"************************************************"
		);
		const car = await Car.findByPk(carId);
		await car.destroy();
		res.json({ message: "successful" });
	})
);

// grab a car by id. This will be helpful for when grabbing a car by id from the url but this might not be needed due to the one above
// if we have already grabbed all of the cars then there might not be a need to get a specific car from the id. We might be able to just grab it
// from the state and by a key #!
// router.get("/car", asyncHandler( async (req, res) => {
//   // do a query for all of the cars in the db
//   const cars = await Car.findAll();
//   console.log(cars)
//   res.send(cars)
// }))

// is the router being used correctly in another file (imported and used)?
module.exports = router;
