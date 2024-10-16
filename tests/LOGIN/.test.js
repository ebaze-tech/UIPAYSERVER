import chai, { use, request } from "chai";
import chaiHttp from "chai-http";
use(chaiHttp);
const { expect } = chai;

import server from "../../server"; // Adjust path to your server file
import { destroy, create } from "../../models/accounts/Student";
import { destroy as _destroy, create as _create } from "../../models/accounts/Staff";
import { hash } from "bcryptjs";

describe("LoginController", () => {
  beforeEach(async () => {
    await destroy({ where: {} });
    await _destroy({ where: {} });

    const hashedPassword = await hash("password123", 10);
    await create({
      email: "student@example.com",
      password: hashedPassword,
      number: "123456",
    });

    await _create({
      email: "staff@example.com",
      password: hashedPassword,
      number: "12345",
    });
  });

  it("should log in a student successfully", (done) => {
    request(server)
      .post("/api/accounts/login")
      .send({
        number: "123456",
        password: "password123",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message").eql("Login successful.");
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it("should log in a staff successfully", (done) => {
    request(server)
      .post("/api/accounts/login")
      .send({
        number: "12345",
        password: "password123",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message").eql("Login successful.");
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it("should return an error for invalid number", (done) => {
    request(server)
      .post("/api/accounts/login")
      .send({
        number: "111111",
        password: "password123",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("message")
          .eql("Invalid student Number.");
        done();
      });
  });

  it("should return an error for invalid password", (done) => {
    request(server)
      .post("/api/accounts/login")
      .send({
        number: "123456",
        password: "wrongpassword",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message").eql("Invalid password.");
        done();
      });
  });
});
