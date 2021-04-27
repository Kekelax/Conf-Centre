process.env.NODE_ENV = "development";
const User = require("../4. models/user-model");
const Event = require("../4. models/event-model");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
//const request = require("supertest");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

// Makes isAuthenticated = true
// server.request.isAuthenticated = () => {
//   return true;
// };

// server.request.user = {
//   super_user: true,
//   user_name: "Sally-Jean",
//   email: "sally@fastmail.com",
// };

//Clean database before each test
before((done) => {
  Event.deleteMany({}, (err) => {});
  done();
});

// //Clean database after each test
after((done) => {
  Event.deleteMany({}, (err) => {});
  done();
});

describe("Testing DB Routes", () => {
  it("Verify events in the database", (done) => {
    // Makes isAuthenticated = true
    server.request.isAuthenticated = () => {
      return true;
    };

    //GET events
    chai
      .request(server)
      .get("/api/events/all")
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).should.be.a("object");

        done();
      });
  });
});
