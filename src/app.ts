import express from "express";
import cors from "cors";

import * as songsController from "./Controllers/songsController"

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", songsController.sendSong);

export default app;
