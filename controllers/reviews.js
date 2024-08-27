const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    // console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New review created");
    res.redirect(`/listings/${listing._id}`);
  };

  module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
  };