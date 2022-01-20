const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js").app;

chai.should();
chai.use(chaiHttp);

describe("/POST logout", () => {
  it("it should return 200 and message", (done) => {
    chai
      .request(app)
      .post(`/auth/logout`)
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.have.eql("You have successfully logged out");
        done();
      });
  });
});
