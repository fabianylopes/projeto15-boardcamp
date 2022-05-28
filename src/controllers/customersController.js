import connection from "../db.js";

export async function getCustomers(req, res){
    const { cpf } = req.query;

    try {
        const params = [];
        let str = '';

        if(cpf){
            params.push(`${cpf}%`);
            str += `WHERE cpf ILIKE $${params.length}`;
        }

        const customers = await connection.query(`
            SELECT * FROM customers
            ${str}
            `, params);

        res.send(customers.rows);
        
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getCustomer(req, res){
    const { id } = req.params;

    try {

        const customer = await connection.query(`SELECT * FROM customers WHERE id=${id}`);

        res.send()
        
    } catch (error) {
        res.status(500).send(error);
    }
}

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