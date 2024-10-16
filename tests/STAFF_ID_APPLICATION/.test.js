import chai, { use, request } from "chai";
import chaiHttp from "chai-http";
use(chaiHttp);
const { expect } = chai;

import server from "../../server"; // Adjust path to your server file
import { destroy, create } from "../../models/application/Staff";

describe("StaffIdApplicationController", () => {
  afterEach(async () => {
    await destroy({ where: {} });
  });

  it("should apply for a staff ID successfully", (done) => {
    request(server)
      .post("/api/idcard/application/staff")
      .send({
        number: "12345",
        surname: "Doe",
        otherNames: "John",
        position: "Lecturer",
        department: "Computer Science",
        faculty: "Science",
        designation: "Senior Lecturer",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .eql("Staff ID Card application successful.");
        done();
      });
  });

  it("should return an error for existing application", (done) => {
    create({
      number: "12345",
      surname: "Doe",
      otherNames: "John",
      position: "Lecturer",
      department: "Computer Science",
      faculty: "Science",
      designation: "Senior Lecturer",
    }).then(() => {
      request(server)
        .post("/api/idcard/application/staff")
        .send({
          number: "12345",
          surname: "Doe",
          otherNames: "John",
          position: "Lecturer",
          department: "Computer Science",
          faculty: "Science",
          designation: "Senior Lecturer",
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
      .post("/api/idcard/application/staff")
      .send({
        number: "",
        surname: "Doe",
        otherNames: "John",
        position: "Lecturer",
        department: "Computer Science",
        faculty: "Science",
        designation: "Senior Lecturer",
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
