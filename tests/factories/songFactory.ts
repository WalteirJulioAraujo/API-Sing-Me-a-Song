import faker from "faker";

export async function createSong(){
    const name = faker.name.findName();
    const youtubeLink = `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`;
    return {name,youtubeLink};
}

