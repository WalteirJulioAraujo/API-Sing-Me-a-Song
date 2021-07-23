import connection from "../database";

export async function checksIfExistsSong(id:number) {
    const result = await connection.query(`SELECT * FROM songs WHERE id=$1`,[id]);
    return result.rows[0];
}

export async function checksIfExistsVote(id:number) {
    const result = await connection.query(`SELECT * FROM songscore WHERE "songId"=$1`,[id]);
    return result.rows[0];
}

export async function insertFirstVote(id:number) {
    await connection.query(`INSERT INTO songscore ("songId",score) VALUES ($1,$2)`,[id,0]);
}

export async function upVote(id:number) {
    await connection.query(`UPDATE songscore SET score=score+1 WHERE "songId"=$1`,[id]);
}

export async function downVote(id:number) {
   const result = await connection.query(`UPDATE songscore SET score=score-1 WHERE "songId"=$1 RETURNING score`,[id]);
   return result.rows[0].score;
}

export async function deleteSong(id:number) {
    await connection.query(`DELETE FROM songscore WHERE "songId"=$1`,[id]);
    await connection.query(`DELETE FROM songs WHERE id=$1`,[id]);
}