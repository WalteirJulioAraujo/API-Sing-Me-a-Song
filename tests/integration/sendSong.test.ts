import supertest from "supertest";
import app from "../../src/app";
import { createSong } from "../factories/songFactory"

const agent = supertest(app);

describe("POST /recommendations", () => {
  it("returns status 201 for valid params", async () => {
    const song = await createSong();
    const response = await agent.post("/recommendations").send({ name:song.name, youtubeLink:song.youtubeLink });
    expect(response.status).toBe(201);
  });
});
