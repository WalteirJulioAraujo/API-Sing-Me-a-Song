import * as voteRepository from "../Repositories/voteRepository";
import { vote } from "../Schemas/AllSchemas";

export async function upVote(id:number){
    const result = await voteRepository.checksIfExistsSong(id);
    if(!result) return false;
    
    const existVote = await voteRepository.checksIfExistsVote(id);
    if(!existVote){
        await voteRepository.insertFirstVote(id);
    };

    await voteRepository.upVote(id);
    return true;
}

export async function downVote(id:number){
    const result = await voteRepository.checksIfExistsSong(id);
    if(!result) return false;

    const existVote = await voteRepository.checksIfExistsVote(id);
    if(!existVote){
        await voteRepository.insertFirstVote(id);
    };
    
    const votes = await voteRepository.downVote(id);
    if(votes === -5){
        await voteRepository.deleteSong(id);
    }
    return true;
}