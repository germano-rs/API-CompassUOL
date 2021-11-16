const chai = require("chai");
const app = require("../app");
const ClientsDB = require("../database/Clients");
const CitiesDB = require("../database/Cities");

const should = chai.should();
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
describe("API TESTS", () => {
  after(async () => {
    await ClientsDB.deleteClients();
    await CitiesDB.deleteCities();
  });
  describe("Cities Route", () => {
    it("POST new city.", (done) => {
      newCity = {
        city_name: "Foo Bar",
        state: "FB",
      };

      chai
        .request(app)
        .post("/cities")
        .send(newCity)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal(
              `Successful post city Id ${res.body.result.insertId}`
            );
          cityId = res.body.result.insertId;
          done();
        });
    });

    it("GET list of a cities.", (done) => {
      chai
        .request(app)
        .get("/cities")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal("Successful get cities.");
          res.body.result.should.be.an("array").that.have.lengthOf.at.least(1);

          done();
        });
    });
  });

  describe("Clients Route", () => {
    it("POST new client.", (done) => {
      newClient = {
        name: "Foo",
        genre: "Male",
        birth_date: "30/05/1989",
        city_id: cityId,
      };
      chai
        .request(app)
        .post("/clients")
        .send(newClient)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal(
              `Successful post client Id ${res.body.result.insertId}`
            );
          clientId = res.body.result.insertId;
          done();
        });
    });
    it("POST new client with non-existent city.", (done) => {
      newClient = {
        name: "Foo",
        genre: "Male",
        birth_date: "30/05/1989",
        city_id: 0,
      };
      chai
        .request(app)
        .post("/clients")
        .send(newClient)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal(`This city is not registered.`);
          done();
        });
    });
    it("GET list of a clients.", (done) => {
      chai
        .request(app)
        .get("/clients")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal("Successful get clients.");
          res.body.result.should.be.an("array").that.have.lengthOf.at.least(1);

          done();
        });
    });

    it("GET client by id.", (done) => {
      chai
        .request(app)
        .get("/clients/" + clientId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal(`Successful get client with Id ${clientId}`);
          res.body.result.should.be.an("array");
          res.body.result[0].should.have.property("id").eql(clientId);
          done();
        });
    });
    it("GET client with non-existent id.", (done) => {
      chai
        .request(app)
        .get("/clients/" + 0)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal(`Client Id ${0} not found.`);
          res.body.result.should.be.an("array").to.have.lengthOf(0);
          done();
        });
    });
    it("GET client by name.", (done) => {
      chai
        .request(app)
        .get("/clients?name=" + newClient.name)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal("Successful get clients.");

          res.body.result.should.be.an("array").that.have.lengthOf.at.least(1);
          done();
        });
    });
    it("GET client with non-existent name.", (done) => {
      chai
        .request(app)
        .get("/clients?name= BarFoo")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal("Successful get clients.");
          res.body.result.should.be.an("array").to.have.lengthOf(0);
          done();
        });
    });

    it("PATCH client name.", (done) => {
      newClientName = {
        name: "Bar",
      };
      chai
        .request(app)
        .patch("/clients/" + clientId)
        .send(newClientName)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal("Client updated successfully.");
          res.body.result[0].should.have.property("id").eql(clientId);
          res.body.result[0].should.have
            .property("name")
            .eql(newClientName.name);
          done();
        });
    });
    it("PATCH client with non-existent id.", (done) => {
      chai
        .request(app)
        .patch("/clients/" + 0)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal(`Client Id ${0} not found.`);
          res.body.result.should.be.an("array").to.have.lengthOf(0);
          done();
        });
    });
    it("DELETE client by id.", (done) => {
      chai
        .request(app)
        .delete("/clients/" + clientId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal(`Client ${clientId} deleted.`);
          res.body.result.should.have.property("affectedRows").eql(1);
          done();
        });
    });
    it("DELETE client with non-existent id.", (done) => {
      chai
        .request(app)
        .delete("/clients/" + 0)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property("message")
            .that.have.to.be.equal(`Client Id ${0} not found.`);
          res.body.result.should.be.an("array").to.have.lengthOf(0);
          done();
        });
    });
  });
});
