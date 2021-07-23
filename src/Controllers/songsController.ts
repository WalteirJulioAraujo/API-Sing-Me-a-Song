import { Request, Response } from "express";
import * as songsService from "../Services/songsService";
import { songSchema } from "../Schemas/AllSchemas";

export async function sendSong(req:Request,res:Response){

    const { name, youtubeLink } = req.body;
    
    const validate = songSchema.validate(req.body);
    if(validate.error){
        console.log(validate.error);
        return res.sendStatus(400);
    }

    try{
        const result = await songsService.sendSong(name,youtubeLink);
        if(!result) return res.sendStatus(400); //bad request
        res.sendStatus(201);

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
      
}