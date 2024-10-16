import chai, { use, request } from "chai";
import chaiHttp from "chai-http";
use(chaiHttp);
const { expect } = chai;

import server from "../../server"; // Adjust path to your server file
import { destroy, create } from "../../models/replacement/Staff";
import { destroy as _destroy } from "../../models/replacement/Student";

describe("IdCardReplacementController", () => {
  afterEach(async () => {
    await destroy({ where: {} });
    await _destroy({ where: {} });
  });

  it("should apply for a staff ID card replacement successfully", (done) => {
    request(server)
      .post("/api/idcard/replacement/staff")
      .send({
        number: "12345",
        surname: "Doe",
        otherNames: "John",
        reason: "Lost ID card",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .eql("Staff ID Card replacement application successful.");
        done();
      });
  });

  it("should apply for a student ID card replacement successfully", (done) => {
    request(server)
      .post("/api/idcard/replacement/student")
      .send({
        number: "123456",
        surname: "Smith",
        otherNames: "Jane",
        reason: "Damaged ID card",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .eql("Student ID Card replacement application successful.");
        done();
      });
  });

  it("should return an error for missing required fields", (done) => {
    request(server)
      .post("/api/idcard/replacement/staff")
      .send({
        number: "",
        surname: "Doe",
        otherNames: "John",
        reason: "Lost ID card",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("message")
          .eql("Invalid input. Please fill in all required fields.");
        done();
      });
  });

  it("should return an error for duplicate replacement application", (done) => {
    create({
      number: "12345",
      surname: "Doe",
      otherNames: "John",
      reason: "Lost ID card",
    }).then(() => {
      request(server)
        .post("/api/idcard/replacement/staff")
        .send({
          number: "12345",
          surname: "Doe",
          otherNames: "John",
          reason: "Lost ID card",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property("message")
            .eql("Replacement application already exists.");
          done();
        });
    });
  });
});
