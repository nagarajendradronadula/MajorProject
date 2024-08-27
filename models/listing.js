const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  // image: {
  //     type: String,
  //     // default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.&ixid=M3wxMjA3fDB8MI",
  //     // set: (v) => v === "" ? "pexels-butfirstcaphesuada-1081260075-20780455.jpg" : v,
  // },
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// listingSchema.post("findOneAndDelete", async (listing) => {
//     if(listing){
//         await Review.deleteMany({ _id: { $in: listing.reviews } });
//     }
// });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
