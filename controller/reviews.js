const Review = require("../models/reviews");
const Comments = require("../models/comments");
const {DateTime} = require('luxon')

module.exports = function (app) {
  app.get("/", (req, res) => {
    Review.find()
      .lean()
      .then((reviews) => {
        res.render("reviews-index", { reviews: reviews });
      })
      .catch((err) => console.log("err", err));
  });

  // Get add review form
  app.get("/reviews/new", (req, res) => {
    res.render("reviews-new", { heading: "Add Review" });
  });

  // Create a review
  app.post("/reviews", (req, res) => {
    const newReview = req.body;
    Review.create(newReview)
      .then((response) => {
        if (response?.title !== "") {
          res.redirect("/");
        } else {
          throw new Error("Error while creating a review");
        }
      })
      .catch((err) => console.log(err));
  });

  // Show a single review
  app.get("/reviews/:id", (req, res) => {
    const reviewId = req.params.id;

    // --- Good example for Promise.all() ----
    // const promise1 = Review.findById(reviewId).lean();
    // const promise2 = Comments.find({}).lean();
    // Promise.all([promise1, promise2])
    //   .then((values) => {
    //     res.render("review-show", { review: values[0], comments: values[1] });
    //     console.log(values);
    //   })
    //   .catch((err) => console.log(err));

    Review.findById(reviewId)
      .lean()
      .then((review) => {
        Comments.find({ reviewId: review._id })
          .lean()
          .then((comments) => {
             console.log("review", review);
            //TODO: const dt = DateTime.fromISO(review.createdAt.toString());
            const dt = review.createdAt.toString().slice(0,10)
            console.log(dt);
            review.createdAt = dt;
            // console.log("comments", comments);
            res.render("review-show", { review: review, comments: comments });
          });
      })
      .catch((err) => console.log(err));
  });

  // Get edit form
  app.get("/reviews/:id/edit", (req, res) => {
    Review.findById(req.params.id)
      .lean()
      .then((review) => {
        res.render("reviews-edit", {
          review: review,
          heading: "Edit Review",
        });
      })
      .catch((err) => console.log(err));
  });

  // Edit a single review
  app.put("/reviews/:id", (req, res) => {
    const reviewId = req.params.id;
    const updatedReview = req.body;
    Review.findByIdAndUpdate(reviewId, updatedReview)
      .then((review) => {
        // console.log(review)
        res.redirect(`/reviews/${review._id}`);
      })
      .catch((err) => console.log(err));
  });

  // Delete a single review
  app.delete("/reviews/:id", (req, res) => {
    Review.findByIdAndRemove(req.params.id)
      .then((review) => {
        res.redirect("/");
      })
      .catch((err) => console.log("err", err));
  });
};
