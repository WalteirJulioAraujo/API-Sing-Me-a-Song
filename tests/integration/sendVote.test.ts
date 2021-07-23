import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, endConnection, insertSong, returnsAllSongsFromDatabase } from "../utils/database";
import { createSong } from "../factories/songFactory";

const agent = supertest(app);

beforeEach( async ()=>{
    await clearDatabase();
})
  
afterAll( async ()=>{
    await clearDatabase();
    endConnection(); 
});

describe("POST /recommendatios/:id/upvote", () => {
    it("return status 200 for a valid upvote", async ()=> {
        const newsong = await createSong();
        const result = await insertSong(newsong.name, newsong.youtubeLink);
        const response = await agent.post(`/recommendatios/${result.id}/upvote`);
        expect(response.status).toBe(200);
    })

    it("return status 401 for a invalid id", async ()=> {
        const newsong = await createSong();
        await insertSong(newsong.name, newsong.youtubeLink);
        const result = await returnsAllSongsFromDatabase();
        const invalidId = result[result.length-1].id + 1;
        const response = await agent.post(`/recommendatios/${invalidId}/upvote`);
        expect(response.status).toBe(401);
    })

    it("return status 400 for a invalid param", async ()=> {
        const newsong = await createSong();
        await insertSong(newsong.name, newsong.youtubeLink);
        const invalidParam = "teste"
        const response = await agent.post(`/recommendatios/${invalidParam}/upvote`);
        expect(response.status).toBe(400);
    })
});

describe("POST /recommendatios/:id/downvote", () => {

    it("return status 200 for a valid downvote", async ()=> {
        const newsong = await createSong();
        const result = await insertSong(newsong.name, newsong.youtubeLink);
        const response = await agent.post(`/recommendatios/${result.id}/downvote`);
        expect(response.status).toBe(200);
    })

    it("return status 401 for a invalid id", async ()=> {
        const newsong = await createSong();
        await insertSong(newsong.name, newsong.youtubeLink);
        const result = await returnsAllSongsFromDatabase();
        const invalidId = result[result.length-1].id + 1;
        const response = await agent.post(`/recommendatios/${invalidId}/downvote`);
        expect(response.status).toBe(401);
    })

    it("return status 400 for a invalid param", async ()=> {
        const newsong = await createSong();
        await insertSong(newsong.name, newsong.youtubeLink);
        const invalidParam = "teste"
        const response = await agent.post(`/recommendatios/${invalidParam}/downvote`);
        expect(response.status).toBe(400);
    })

    it("checks if a song with -5 votes was deleted", async ()=> {
        const newsong = await createSong();
        const result = await insertSong(newsong.name, newsong.youtubeLink);
        await agent.post(`/recommendatios/${result.id}/downvote`);
        await agent.post(`/recommendatios/${result.id}/downvote`);
        await agent.post(`/recommendatios/${result.id}/downvote`);
        await agent.post(`/recommendatios/${result.id}/downvote`);
        const songExistInDatabase = await returnsAllSongsFromDatabase();
        expect(songExistInDatabase.length).toBe(1);
        await agent.post(`/recommendatios/${result.id}/downvote`);
        const response = await returnsAllSongsFromDatabase();
        expect(response.length).toBe(0);

    })
});