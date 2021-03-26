const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

// sets the JWT cookie after a user has logged in or signed up by taking the response
// and then generates a JWT using the imported secret from the .env file. The secret will be
// expire after a the time we set is up
const setTokenCookie = (res, user) => {
	// Create the token.
	const token = jwt.sign(
		{ data: user.toSafeObject() },
		secret,
		{ expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
	);

	const isProduction = process.env.NODE_ENV === "production";

	// Set the token cookie
	res.cookie("token", token, {
		maxAge: expiresIn * 1000, // maxAge in milliseconds
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction && "Lax",
	});

	return token;
};

// middleware function to authenticate certain routes
// will restore the session user based on the contents of the JWT cookie
const restoreUser = (req, res, next) => {
	// token parsed from cookies
	const { token } = req.cookies;

	return jwt.verify(token, secret, null, async (err, jwtPayload) => {
		if (err) {
			return next();
		}

		try {
			const { id } = jwtPayload.data;
			req.user = await User.scope("currentUser").findByPk(id);
		} catch (e) {
			res.clearCookie("token");
			return next();
		}

		if (!req.user) res.clearCookie("token");

		return next();
	});
};

// authentication middleware for requiring a session user to be authenticated before accessing a route.
const requireAuth = [
	restoreUser,
	function (req, res, next) {
		if (req.user) return next();

		const err = new Error("Unauthorized");
		err.title = "Unauthorized";
		err.errors = ["Unauthorized"];
		err.status = 401;
		return next(err);
	},
];

// Both restoreUser and requireAuth will be applied as a pre-middleware to route handlers where needed.

module.exports = { setTokenCookie, restoreUser, requireAuth };
