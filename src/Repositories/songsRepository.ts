import connection from "../database";

export async function sendSong(name:string,youtubeLink:string){
   const result = await connection.query(`INSERT INTO songs (name,"youtubeLink") VALUES ($1,$2) RETURNING *`,[name,youtubeLink]);
   return result.rows[0];
}

export async function checksIfExistsSong() {
   const result = await connection.query("SELECT * FROM songs");
   return result.rows;
}

export async function randomSong(scoregreater:boolean,searchAll:boolean) {
   let result;
   if(searchAll){
      result = result = await connection.query(`
      SELECT songs.*,songscore.score FROM songs 
      JOIN songscore ON songscore."songId"= songs.id
      `);
   }else if(scoregreater){
      result = await connection.query(`
      SELECT songs.*,songscore.score FROM songs 
      JOIN songscore ON songscore."songId"= songs.id
      WHERE songscore.score > 10
      `);
   }else{
      result = await connection.query(`
      SELECT songs.*,songscore.score FROM songs 
      JOIN songscore ON songscore."songId"= songs.id
      WHERE songscore.score <= 10
      `);
   }
   return result.rows;
}

export async function searchTopSongs(amount:number) {
   const result = await connection.query(`
   SELECT songs.*,songscore.score FROM songs 
   JOIN songscore ON songscore."songId"= songs.id
   ORDER BY songscore.score DESC
   LIMIT $1 
   `,[amount]);
   return result.rows;
}