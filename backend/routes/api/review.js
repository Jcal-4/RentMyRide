const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Review } = require("../../db/models");

router.post(
	"/",
	asyncHandler(async (req, res) => {
		const { authorId, carId, title, description, rating } = req.body;

		const newReview = await Review.create({
			authorId,
			carId,
			title,
			description,
			rating,
		});

		return res.json(newReview);
	})
);

module.exports = router;
