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