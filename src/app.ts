import express from "express";
import cors from "cors";

import connection from "./database";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("OK!");
});

app.post("/recommendations", async (req,res) => {
  try{
    const { name } = req.body;
    const { youtubeLink } = req.body;
    await connection.query(`INSERT INTO songs (name,"youtubeLink") VALUES ($1,$2)`,[name,youtubeLink]);
    res.sendStatus(201);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }

});

export default app;
