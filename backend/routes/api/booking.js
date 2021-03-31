const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { User } = require("../../db/models");
const { Booking } = require("../../db/models");

router.get(
	"/:userId",
	asyncHandler(async (req, res) => {
		// do a query for all the bookings that a user has associations to
		const user = await User.findByPk(req.params.userId, {
			include: Booking,
		});
		return res.json(user);
	})
);

module.exports = router;
