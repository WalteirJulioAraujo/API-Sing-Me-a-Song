import connection from "../database";

//interfaces
interface SendSong {
   name:string;
   youtubeLink:string;
}

interface Song extends SendSong{
   id:number;
}

interface SongWithScore extends SendSong{
   id:number;
   score:number;
}

export async function sendSong({name,youtubeLink}:SendSong) : Promise<Song>{
   const result = await connection.query(`INSERT INTO songs (name,"youtubeLink") VALUES ($1,$2) RETURNING *`,[name,youtubeLink]);
   return result.rows[0];
}

export async function checksIfExistsSong() : Promise<Song[]>{
   const result = await connection.query("SELECT * FROM songs");
   return result.rows;
}

export async function randomSong(scoregreater:boolean,searchAll:boolean) : Promise<SongWithScore[]> {
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

export async function searchTopSongs(amount:number) : Promise<SongWithScore[]>{
   const result = await connection.query(`
   SELECT songs.*,songscore.score FROM songs 
   JOIN songscore ON songscore."songId"= songs.id
   ORDER BY songscore.score DESC
   LIMIT $1 
   `,[amount]);
   return result.rows;
}