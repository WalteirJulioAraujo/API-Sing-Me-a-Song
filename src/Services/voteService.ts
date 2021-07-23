import * as voteRepository from "../Repositories/voteRepository";

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