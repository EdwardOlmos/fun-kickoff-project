const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js").app;

chai.should();
chai.use(chaiHttp);

describe("Logout Test Cases", () => {
  describe("/POST logout", () => {
    it("it should return 200 and message", (done) => {
      chai
        .request(app)
        .post(`/auth/logout`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.not.have.cookie('token');
          res.text.should.have.eql("You have successfully logged out");
          done();
        });
    });
  });

  describe("/GET logout", () => {
    it("it should return 500 and error message", (done) => {
      chai
        .request(app)
        .get(`/auth/logout`)
        .end((err, res) => {
          res.should.have.status(500);
          res.should.not.have.cookie('token');
          res.body.should.have
            .property("error")
            .eql("Not Found");
          done();
        });
    });
  })
});
