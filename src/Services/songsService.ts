import * as songsRepository from "../Repositories/songsRepository";

export async function sendSong(name:string,youtubeLink:string){
    const result = await songsRepository.sendSong(name,youtubeLink);
    return result;
}

export async function randomSong() {

    const check = await songsRepository.checksIfExistsSong()
    if(check.length === 0) return false;
    let result;

    const probability = Math.floor(Math.random() * 10);
    if(probability<3){
        result = await songsRepository.randomSong(false,false);
    }else{
        result = await songsRepository.randomSong(true,false);
    }
    if(result.length===0){
        result = await songsRepository.randomSong(true,true);
    }

    const chooseRandom = Math.floor(Math.random()*(result.length))

    return result[chooseRandom];
}