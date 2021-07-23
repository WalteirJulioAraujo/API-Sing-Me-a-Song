import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, endConnection, insertSong, insertUpVote, insertVote } from "../utils/database";
import { createSong } from "../factories/songFactory";


beforeEach( async ()=>{
  await clearDatabase();
})

afterAll( async ()=>{
  await clearDatabase();
  endConnection(); 
});

const agent = supertest(app);

describe("GET /recommendations/random", () => {

  it("returns status 404 if there is no music", async () => {
    const result = await agent.get("/recommendations/random");
    expect(result.status).toBe(404);
  });

  it("returns status 200 for a valid request", async () => {
    const newsong = await createSong();
    const inserted = await insertSong(newsong.name,newsong.youtubeLink);
    await insertVote(inserted.id);
    const result = await agent.get("/recommendations/random");
    const songResult = [result];
    expect(result.status).toBe(200);
    expect(songResult.length).toBe(1);
  });
});

describe("GET /recommendations/:amount", () => {

    it("returns status 404 if there is no music", async () => {
      const amount = Math.floor(Math.random()*30);  
      const result = await agent.get(`/recommendations/top/${amount}`);
      expect(result.status).toBe(404);
    });

    it("returns status 400 for invalid param", async () => {
        const amount = 'teste'  
        const result = await agent.get(`/recommendations/top/${amount}`);
        expect(result.status).toBe(400);
    });

    it("returns status 200 for valid param", async () => {
        const firstnewsong = await createSong();
        const firstinserted = await insertSong(firstnewsong.name,firstnewsong.youtubeLink);
        await insertVote(firstinserted.id);
        await insertUpVote(firstinserted.id);
        await insertUpVote(firstinserted.id);
        await insertUpVote(firstinserted.id);
        const secondnewsong = await createSong();
        const secondinserted = await insertSong(secondnewsong.name,secondnewsong.youtubeLink);
        await insertVote(secondinserted.id);
        await insertUpVote(secondinserted.id);
        await insertUpVote(secondinserted.id);
        let amount = 1;
        const result = await agent.get(`/recommendations/top/${amount}`);
        expect(result.status).toBe(200);
        expect(result.body.length).toBe(amount);
        amount = 2
        const newresult = await agent.get(`/recommendations/top/${amount}`);
        expect(newresult.body.length).toBe(amount);
    });

  });