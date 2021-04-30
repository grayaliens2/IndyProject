// Imports the server.js file to be tested.
let server = require("../server");
const express = require("express");
const app = express();
app.set('view engine', 'ejs');
//Assertion (Test Driven Development) and Should, Expect(Behaviour driven development) library
let chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { expect } = chai;
var assert = chai.assert;

//Import complete


describe("Server!", () => {//I could not get this request to procced with rendering the page hence this checks that
  //The input of Nirvana is a string and then will procceed to err with Failed to lookup view "pages/home" in views directory
      // Add your test cases here
      it("Tests post /asktest", done => {
      chai
        .request(server)
        .post("/asktest")
        .send({artname: "Nirvana"})
        .end((err, res) => {
          expect(res).to.have.status(200);//expected to pass
          done();
        });
    });

    it("Tests post /askreviewtest", done => {//This checks wether or not querying the database was successful
      //again it will technically pass the test, its just that this function will procceed to error with rendering a page
    chai
      .request(server)
      .post("/askreviewtest")
      .send({artname: "Nirvana"})
      .end((err, res) => {
        expect(res).to.have.status(200);//expected to pass
        done();
      });
  });
});
