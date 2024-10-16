import chai, { use, request } from "chai";
import chaiHttp from "chai-http";
use(chaiHttp);
const { expect } = chai;

import server from "../../server"; // Adjust path to your server file
import { destroy, create } from "../../models/application/Student";

describe("StudentIdApplicationController", () => {
  afterEach(async () => {
    await destroy({ where: {} });
  });

  it("should apply for a student ID successfully", (done) => {
    request(server)
      .post("/api/idcard/application/student")
      .send({
        number: "123456",
        surname: "Smith",
        otherNames: "Jane",
        level: "200",
        department: "Computer Science",
        faculty: "Science",
        hall: "Hall 1",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .eql("Student ID Card application successful.");
        done();
      });
  });

  it("should return an error for an existing student ID application", (done) => {
    create({
      number: "123456",
      surname: "Smith",
      otherNames: "Jane",
      level: "200",
      department: "Computer Science",
      faculty: "Science",
      hall: "Hall 1",
    }).then(() => {
      request(server)
        .post("/api/idcard/application/student")
        .send({
          number: "123456",
          surname: "Smith",
          otherNames: "Jane",
          level: "200",
          department: "Computer Science",
          faculty: "Science",
          hall: "Hall 1",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property("message")
            .eql("Application already exists.");
          done();
        });
    });
  });

  it("should return an error for invalid input", (done) => {
    request(server)
      .post("/api/idcard/application/student")
      .send({
        number: "",
        surname: "Smith",
        otherNames: "Jane",
        level: "200",
        department: "Computer Science",
        faculty: "Science",
        hall: "Hall 1",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("message")
          .eql("Invalid input. Please fill in all required fields.");
        done();
      });
  });
});
