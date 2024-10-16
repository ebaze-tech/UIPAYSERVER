import chai, { use, request } from "chai";
import chaiHttp from "chai-http";
use(chaiHttp);
const { expect } = chai;

import server from "../../server"; // Adjust path to your server file
import { destroy, create } from "../../models/upgrade/Staff";
import { destroy as _destroy } from "../../models/upgrade/Student";

describe("IdCardUpgradeController", () => {
  afterEach(async () => {
    await destroy({ where: {} });
    await _destroy({ where: {} });
  });

  it("should apply for a staff ID card upgrade successfully", (done) => {
    request(server)
      .post("/api/idcard/upgrade/staff")
      .send({
        number: "12345",
        surname: "Doe",
        otherNames: "John",
        newDesignation: "Professor",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .eql("Staff ID Card upgrade application successful.");
        done();
      });
  });

  it("should apply for a student ID card upgrade successfully", (done) => {
    request(server)
      .post("/api/idcard/upgrade/student")
      .send({
        number: "123456",
        surname: "Smith",
        otherNames: "Jane",
        newLevel: "300",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .eql("Student ID Card upgrade application successful.");
        done();
      });
  });

  it("should return an error for missing required fields", (done) => {
    request(server)
      .post("/api/idcard/upgrade/staff")
      .send({
        number: "",
        surname: "Doe",
        otherNames: "John",
        newDesignation: "Professor",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("message")
          .eql("Invalid input. Please fill in all required fields.");
        done();
      });
  });

  it("should return an error for duplicate upgrade application", (done) => {
    create({
      number: "12345",
      surname: "Doe",
      otherNames: "John",
      newDesignation: "Professor",
    }).then(() => {
      request(server)
        .post("/api/idcard/upgrade/staff")
        .send({
          number: "12345",
          surname: "Doe",
          otherNames: "John",
          newDesignation: "Professor",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property("message")
            .eql("Upgrade application already exists.");
          done();
        });
    });
  });
});
