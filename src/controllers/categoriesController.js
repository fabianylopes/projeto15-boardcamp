import connection from "../db.js";

export async function getCategories(req, res){
    
    const result = await connection.query('SELECT * FROM categorias');
    
    console.log(result);

    res.send('ok');
}