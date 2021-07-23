import express from "express";
import cors from "cors";

import * as songsController from "./Controllers/songsController"
import * as voteController from "./Controllers/voteController"

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", songsController.sendSong);

app.post("/recommendatios/:id/upvote", voteController.upVote);

app.post("/recommendatios/:id/downvote", voteController.downVote);


export default app;
