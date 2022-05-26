import connection from "../db.js";

export async function getCategories(req, res){

    const result = await connection.query('SELECT * FROM categories');

    res.send(result.rows);
}