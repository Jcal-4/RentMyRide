const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {Car} = require("../../db/models")

// everything car related api will go here to this file in the backend

// grab all the cars so we are able to render them out anywhere on the page

router.get("/car", asyncHandler( async (req, res) => {
  // do a query for all of the cars in the db
  const cars = await Car.findAll();
  console.log(cars)
  res.send(cars)
}))

// is the router being used correctly in another file (imported and used)?
module.exports = router
