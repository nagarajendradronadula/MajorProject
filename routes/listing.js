const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});

const listingController = require("../controllers/listings.js");

router
    .route("/")
    .get(wrapAsync(listingController.index))//index route
    .post(isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing));//create route
    
//new  route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))//show route
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))//Update route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));//delete route


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));


// router.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "This is a new villa",
//         price: 5000,
//         location: "Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful Listing");
// });

module.exports = router;
