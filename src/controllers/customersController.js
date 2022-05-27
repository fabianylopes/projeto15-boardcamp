import connection from "../db.js";

export async function setCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body;

    try {

        await connection.query(`
        INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4)
        `, [name, phone, cpf, birthday]);

        res.sendStatus(201);
        
    } catch (error) {
        res.status(500).send(error);
    }
}