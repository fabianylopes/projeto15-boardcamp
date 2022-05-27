import connection from "../db.js";

export async function getCategories(req, res){

    try {
        const result = await connection.query('SELECT * FROM categories');
    
        res.send(result.rows);
        
    } catch (error) {
        res.status(500).send(error);
    }

}

export async function setCategory(req, res){
    const { name } = req.body;

    try {
        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);

        res.sendStatus(201);
        
    } catch (error) {
        res.status(500).send(error);
    }
}