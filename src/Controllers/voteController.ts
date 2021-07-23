import * as voteService from "../Services/voteService";
import { Request, Response } from "express";
import { vote } from "../Schemas/AllSchemas";

export async function upVote(req:Request,res:Response) {
    const id  = Number(req.params.id);

    const validate = vote.validate({id});
    if(validate.error){
        console.log(validate.error);
        return res.sendStatus(400);
    }
    try{
        const result = await voteService.upVote(id);
        if(!result) return res.sendStatus(401);
        res.sendStatus(200);

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}