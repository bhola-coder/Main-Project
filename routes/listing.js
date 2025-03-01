const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
//? Controllers are here
const { index, newListing, showListing, createListing, editListing, updateListing, deleteListing } = require("../controllers/listings.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
    //? Index Route
   .get( wrapAsync(index))

   //? Create Route 
    .post( isLoggedIn, upload.single('listing[image]'), validateListing,  wrapAsync(createListing));
    

//? New Route
router.get("/new", isLoggedIn, newListing);

router.route("/:id")
   //? Show Route
   .get( wrapAsync(showListing))

   //? Update Route
   .put( isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(updateListing))

   //?Delete Route
    .delete( isLoggedIn, isOwner, wrapAsync(deleteListing));


//? Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing));


module.exports = router;