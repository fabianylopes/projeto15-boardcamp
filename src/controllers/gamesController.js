import connection from "../db.js";

export async function getGames(req, res){

    try {
        
       const games =  await connection.query('SELECT * FROM games');

        res.send(games.rows);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function setGames(req, res){
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await connection.query(`
        INSERT INTO games (name, image, stockTotal, categoryId, pricePerDay)
        VALUES ($1, $2, $3, $4, $5)
        `, [name, image, stockTotal, categoryId, pricePerDay]);

        res.sendStatus(201);
        
    } catch (error) {
        res.status(500).send(error);
    }
}