import connection from "../db.js";

export async function getGames(req, res){
    const { name } = req.query;

    try {       
        const params = [];
        let str = '';

        if(name){
            params.push(`${name}%`);
            str += `WHERE games.name ILIKE $${params.length}`
        }

        const games =  await connection.query(`
        SELECT 
            games.*, categories.name AS "categoryName"
        FROM games
            JOIN categories ON categories.id=games."categoryId"
            ${str}
        `, params);

            res.send(games.rows);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function setGames(req, res){
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await connection.query(`
        INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5)
        `, [name, image, stockTotal, categoryId, pricePerDay]);

        res.sendStatus(201);
        
    } catch (error) {
        res.status(500).send(error);
    }
}