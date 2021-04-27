process.env.NODE_ENV = "development";
const Event = require("../4. models/event-model");
const User = require("../4. models/user-model");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

// //Clean database before each test
before((done) => {
  //   const user = await  User.findOne({email:"mattjones@yahoo.com"})
  //   const removeUser = await user.remove()
  User.deleteOne({ email: "mattjones@yahoo.com" }, (err) => {});
  Event.deleteMany({}, (err) => {});
  done();
});

//Clean database after each test
after((done) => {
  User.deleteOne({ email: "mattjones@yahoo.com" }, (err) => {});
  Event.deleteMany({}, (err) => {});
  done();
});

describe("User authentication routes", () => {
  it("Register new user and login", (done) => {
    const user = {
      user_name: "Matthew Jones",
      email: "mattjones@yahoo.com",
      password: "password",
      super_user: true,
    };

    //Register user
    chai
      .request(server)
      .post("/auth/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.msg).to.be.equal(
          `User ${user.user_name} registered successfully`
        );
        //Login user
        chai
          .request(server)
          .post("/auth/login")
          .send({ email: "mattjones@yahoo.com", password: "password" })
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.msg).to.be.equal(
              `${user.user_name} logged in successfully`
            );
          });
        done();
      });
  });

  // Test logs in with a super user account, creates an event and updates the
  // same event (POST and PUT events)
  it("Login and create an event", (done) => {
    const agent = chai.request.agent(server);
    const event = {
      name: "ISF - Information Security Threat Model",
      description: "Threat model for the digital age",
      date: "2021-06-26",
      presenter: "Luke Wilson",
    };

    const updatedEvent = {
      presenter: "John Bishop",
      date: "2021-12-14",
    };
    //Login user
    agent
      .post("/auth/login")
      .send({ email: "ellie@yahoo.com", password: "password" })
      .then((res) => {
        expect(res).to.have.cookie("express:sess");

        //POST an event
        return agent
          .post("/api/events/")
          .send(event)
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.name).to.be.equal(
              "ISF - Information Security Threat Model"
            );

            //PUT an event
            return agent
              .put(`/api/events/${res.body._id}`)
              .send(updatedEvent)
              .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.equal(true);
                expect(res.body.event.presenter).to.be.equal("John Bishop");

                done();
              });
          });
      });
  });
});
