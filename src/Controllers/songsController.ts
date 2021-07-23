import { Request, Response } from "express";
import * as songsService from "../Services/songsService";
import { songSchema, amountSchema } from "../Schemas/AllSchemas";

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

export async function randomSong(req:Request,res:Response){
    try{
        const result =  await songsService.randomSong();
        if(!result) return res.sendStatus(404);
        res.send(result).status(200);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function topSong(req:Request,res:Response) {
    const amount = Number(req.params.amount);

    const validate = amountSchema.validate({amount});
    if(validate.error){
        console.log(validate.error);
        return res.sendStatus(400);
    }

    try{
        const result = await songsService.topSong(amount);
        if(!result) return res.sendStatus(404);

        res.send(result).status(200);

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}