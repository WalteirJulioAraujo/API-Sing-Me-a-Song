import supertest from "supertest";
import app from "../../src/app";

const agent = supertest(app);

describe("GET /test", () => {
  it("returns status 201 for valid params", async () => {
  });
});
