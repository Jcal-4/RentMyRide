const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Review } = require("../../db/models");
const { Car } = require("../../db/models");

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

router.get(
  "/car/:carId",
  asyncHandler(async (req, res, next) => {
    // grab the car id from the api url through req.params
    const carId = req.params.carId;
    const carReviews = await Review.findAll({
      where: {
        carId: carId,
      },
      include: Car,
    });
    res.send(carReviews);
  })
);

module.exports = router;
