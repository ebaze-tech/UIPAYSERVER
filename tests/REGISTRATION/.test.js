import chai, { use, request } from "chai";
import chaiHttp from "chai-http";
use(chaiHttp);
const { expect } = chai;

import server from "../../server"; // Adjust path to your server file
import { destroy, create } from "../../models/accounts/Student";
import { destroy as _destroy, create as _create } from "../../models/accounts/Staff";

describe("RegisterController", () => {
  afterEach(async () => {
    await destroy({ where: {} });
    await _destroy({ where: {} });
  });

  it("should register a student successfully", (done) => {
    request(server)
      .post("/api/accounts/register")
      .send({
        email: "student@example.com",
        password: "password123",
        number: "123456",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .eql("Student registered successfully.");
        done();
      });
  });

  it("should register a staff successfully", (done) => {
    request(server)
      .post("/api/accounts/register")
      .send({
        email: "staff@example.com",
        password: "password123",
        number: "12345",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .eql("Staff registered successfully.");
        done();
      });
  });

  it("should return an error for an existing student", (done) => {
    create({
      email: "student@example.com",
      password: "password123",
      number: "123456",
    }).then(() => {
      request(server)
        .post("/api/accounts/register")
        .send({
          email: "student2@example.com",
          password: "password123",
          number: "123456",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property("message")
            .eql("Student with this number already exists.");
          done();
        });
    });
  });

  it("should return an error for an existing staff", (done) => {
    _create({
      email: "staff@example.com",
      password: "password123",
      number: "12345",
    }).then(() => {
      request(server)
        .post("/api/accounts/register")
        .send({
          email: "staff2@example.com",
          password: "password123",
          number: "12345",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property("message")
            .eql("Staff with this number already exists.");
          done();
        });
    });
  });
});
