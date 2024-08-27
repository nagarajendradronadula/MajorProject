const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  // console.log(listing);
  if (!listing) {
    req.flash("error", "Listing not found");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  let coordinate = await geocodingClient.forwardGeocode({
    query: req.body.listing.location + "," + req.body.listing.country,
    limit: 1,
  })
    .send()
   
  // console.log(coordinate.body.features[0].geometry.coordinates);
  // res.send("done!");

  // console.log(result);
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url,"/",filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = coordinate.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New listing added");
  // console.log(listing);
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  // console.log(listing);
  if (!listing) {
    req.flash("error", "Listing not found");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250")
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  let DeletedListing = await Listing.findByIdAndDelete(id);
  console.log(DeletedListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
