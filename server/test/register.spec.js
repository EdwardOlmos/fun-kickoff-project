const User = require("../models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js").app;

chai.should();
chai.use(chaiHttp);

describe("Registering a User Test Cases", () => {
  before(async() => {
    await User.findOneAndDelete({ email: "example2@example.com" });
  });
  after(async() => {
    await User.findOneAndDelete({ email: "example2@example.com" });
  });
  describe("POST /auth/register", () => {
    it("creates a new user", (done) => {
      chai
        .request(app)
        .post(`/auth/register`)
        .send({ username: "example2", email: "example2@example.com", password: "test123!" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("success");
          done();
        });
    });

    it("deny user creation", (done) => {
      chai
        .request(app)
        .post(`/auth/register`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});

// describe("/POST ping", () => {
//   it("it should return 200 and message", (done) => {
//     chai
//       .request(app)
//       .post(`/ping/`)
//       .send({ message: "hello" })
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.have
//           .property("response")
//           .eql("Server is running. Message received: hello");
//         done();
//       });
//   });
// });
