const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const carRouter = require("./cars.js");
router.use("/car", carRouter);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);



module.exports = router;
