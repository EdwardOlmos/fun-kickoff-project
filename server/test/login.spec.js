const User = require("../models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js").app;

chai.should();
chai.use(chaiHttp);

describe("Logging a User In Test Cases", () => {
  before(async() => {
    await User.create({ username: "example2", email: "example2@example.com", password: "test123!" });
  });
  after(async() => {
    await User.findOneAndDelete({ email: "example2@example.com" });
  });
  describe("POST /auth/login", () => {
    it("log user in", (done) => {
      chai
        .request(app)
        .post(`/auth/login`)
        .send({ email:"example2@example.com", password:"test123!" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success");
          res.should.have.cookie("token");
          done();
        });
    });

    it("deny user login", (done) => {
      chai
        .request(app)
        .post(`/auth/login`)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.not.have.cookie("token");
          done();
        });
    });
  });
});
