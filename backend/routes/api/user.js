const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { User } = require("../../db/models");

// this will grab us the user and all of their information from the database
router.get(
	"/:userId",
	asyncHandler(async (req, res) => {
		// do a query for all of the cars in the db
		const user = await User.findByPk(req.params.userId);
		return res.json(user);
	})
);

module.exports = router;
