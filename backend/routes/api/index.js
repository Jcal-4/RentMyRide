const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const carRouter = require("./cars.js");
const userRouter = require("./user");
const bookingRouter = require("./booking");
router.use("/car", carRouter);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/user", userRouter);

router.use("/booking", bookingRouter);

module.exports = router;
