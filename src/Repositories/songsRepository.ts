import connection from "../database";

export async function sendSong(name:string,youtubeLink:string){
   const result = await connection.query(`INSERT INTO songs (name,"youtubeLink") VALUES ($1,$2) RETURNING *`,[name,youtubeLink]);
   return result.rows[0];
}