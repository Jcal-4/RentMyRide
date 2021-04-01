const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Car } = require("../../db/models");

router.post(
	"/host",
	asyncHandler(async (req, res) => {
		const {
			userId,
			carMake,
			carModel,
			carYear,
			pricePerDay,
			carImage,
			countryName,
			seats,
			electric,
			autonomous,
			roadsideAssistance,
			cityName,
			stateName,
			address,
		} = req.body;

		const newCar = await Car.create({
			userId,
			carMake,
			carModel,
			carYear,
			pricePerDay,
			carImage,
			countryName,
			seats,
			electric,
			autonomous,
			roadsideAssistance,
			cityName,
			stateName,
			address,
		});
		return res.json({ newCar });
	})
);

module.exports = router;
