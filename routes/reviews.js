const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");

const reviewsController = require("../controllers/reviews.js");

//Reviews
//post review
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewsController.createReview));

//delete review
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewsController.deleteReview));

module.exports = router;