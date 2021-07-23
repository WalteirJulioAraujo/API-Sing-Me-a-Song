import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import { createSong } from "../factories/songFactory"
import { clearDatabase, endConnection, returnsAllSongsFromDatabase, insertSong } from "../utils/database";


const agent = supertest(app);

beforeEach( async ()=>{
  await clearDatabase();
})

afterAll( async ()=>{
  await clearDatabase();
  endConnection(); 
});

describe("POST /recommendations", () => {

  it("returns status 201 for valid params", async () => {
    const song = await createSong();
    const response = await agent.post("/recommendations").send({ name:song.name, youtubeLink:song.youtubeLink });
    expect(response.status).toBe(201);
  });

  it("returns status 400 for empty body", async ()=>{
    const response = await agent.post("/recommendations").send({ });
    expect(response.status).toBe(400); 
  });

  it("returns status 400 if not a youtube link", async ()=>{
    const song = await createSong();
    song.youtubeLink = "http://teste.com"
    const response = await agent.post("/recommendations").send({ name:song.name, youtubeLink:song.youtubeLink });
    expect(response.status).toBe(400); 
  });

  it("checks if the song has been inserted into the database", async ()=>{
    const song = await createSong();
    const insert = await insertSong(song.name, song.youtubeLink);
    const result = await returnsAllSongsFromDatabase();
    expect(result[0]).toStrictEqual(insert);
  });

});
