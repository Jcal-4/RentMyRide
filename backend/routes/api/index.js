const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const carRouter = require("./cars.js");
const userRouter = require("./user");
const bookingRouter = require("./booking");
const hostRouter = require("./hostcar");
const reviewRouter = require("./review");

router.use("/car", carRouter);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/user", userRouter);

router.use("/booking", bookingRouter);

router.use("/user", hostRouter);

router.use("/review", reviewRouter);

module.exports = router;
