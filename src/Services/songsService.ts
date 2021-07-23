import * as songsRepository from "../Repositories/songsRepository";

export async function sendSong(name:string,youtubeLink:string){
    const result = await songsRepository.sendSong(name,youtubeLink);
    return result;
}