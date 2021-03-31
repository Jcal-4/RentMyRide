// /api/session
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models"); // grabbing the user table from the database

// validation checkers middleware
const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Please provide a valid email or username."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password."),
	handleValidationErrors,
];

// Log in ***********************************************************
router.post(
	"/",
	validateLogin,
	asyncHandler(async (req, res, next) => {
		const { credential, password } = req.body;

		const user = await User.login({ credential, password });

		if (!user) {
			const err = new Error("Login failed");
			err.status = 401;
			err.title = "Login failed";
			err.errors = ["The provided credentials were invalid."];
			return next(err);
		}
		// setting the cookie if the user is found
		await setTokenCookie(res, user);

		return res.json({
			user,
		});
	})
);

// Log out *********************************************************
router.delete("/", (_req, res) => {
	res.clearCookie("token");
	return res.json({ message: "success" });
});

// Restore Session User *******************************************
router.get("/", restoreUser, (req, res) => {
	const { user } = req;
	if (user) {
		return res.json({
			user: user.toSafeObject(),
		});
	} else return res.json({});
});

module.exports = router;
