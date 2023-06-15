const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const Review = require("../models/reviews");

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

// Ideally don't call actual API / Database - mock them or use worker threads

// mock review
const sampleReview = {
  title: "Sample title",
  movieTitle: "Sample movieTitle",
  description: "Sample description",
};

describe("Reviews", function () {
  after(function () {
    // runs once after the last test in this block
    Review.deleteMany({ title: "Sample title" })
      .then(function () {
        console.log("Data deleted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
  });

  it("Warmup test", () => {
    should.equal(undefined);
  });
  it("Test get all reviews", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        // res.should.to.be.html;
        // res.should.to.have.status(200);
        expect(res).to.be.html;
        expect(res).to.have.status(200);
        done();
      });
  });
  // Get add review form - easy
  //    --------- your code
  //  Create a review
  const review = new Review(sampleReview);

  it("Test create a review", (done) => {
    review.save().then((err, data) => {
      chai
        .request(app)
        .post("/reviews")
        .end((err, res) => {
          res.should.to.be.html;
          res.should.to.have.status(200);
          done();
        });
    });
  });

  // FINISH UP AT LEAST COUPLE TESTS

  // Show a single review
  //    --------- your code
  // Get edit form
  //    --------- your code
  // Edit a single review
  //    --------- your code
  // Delete a single review
  //    --------- your code
});
