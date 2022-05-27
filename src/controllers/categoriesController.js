import connection from "../db.js";

export async function getCategories(req, res){

    const result = await connection.query('SELECT * FROM categories');

    res.send(result.rows);
}

export async function setCategories(req, res){
    const category = req.body;

    try {
        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [category.name]);

        res.sendStatus(201);
        
    } catch (error) {
        res.status(500).send(error);
    }
}