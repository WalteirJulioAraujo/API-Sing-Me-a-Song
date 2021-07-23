import connection from "../../src/database";

export async function clearDatabase(){
    await connection.query("TRUNCATE songs RESTART IDENTITY CASCADE;");
}

export async function endConnection(){
    connection.end();
}

export async function returnsAllSongsFromDatabase(){
    const result = await connection.query(`SELECT * FROM songs`);
    return result.rows;
}

export async function insertSong(name:string, youtubeLink:string) {
    const result = await connection.query(`INSERT INTO songs (name,"youtubeLink") VALUES ($1,$2) RETURNING *`,[name, youtubeLink]);
    
    return result.rows[0];
}

export async function insertVote(id:number) {
    const result = await connection.query(`INSERT INTO songscore ("songId",score) VALUES ($1,0) RETURNING *`,[id])
}

export async function insertUpVote(id:number) {
    await connection.query(`UPDATE songscore SET score=score+1 WHERE "songId"=$1`,[id]);
}
