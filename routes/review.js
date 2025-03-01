const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview, isLoggedIn, isReviewOwner} = require("../middleware.js");
//? Controllers are here
const { postReview, destroyReview } = require("../controllers/reviews.js");

//Post Review Route
router.post("/",isLoggedIn, validateReview, wrapAsync(postReview));

//? Delete Route
router.delete("/:reviewId",isLoggedIn, isReviewOwner, wrapAsync(destroyReview)
);

module.exports = router;