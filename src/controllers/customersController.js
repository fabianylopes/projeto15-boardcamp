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
        const customer = await connection.query(`SELECT * FROM customers WHERE id=$1`, [id]);

        if(customer.rowCount === 0){
            return res.sendStatus(404);
        }

        res.send(customer.rows);
        
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function setCustomer(req, res){
    const { name, phone, cpf, birthday } = req.body;

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

export async function updateCustomer(req, res){
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    try {
        
        const customer = await connection.query(`
            SELECT id FROM customers WHERE cpf=$1 AND id!=$2
        `, [cpf, id]);

        if(customer.rowCount > 0){
            return res.sendStatus(409);
        }

        await connection.query(`
            UPDATE customers
            SET name=$1, phone=$2, cpf=$3, birthday=$4
            WHERE id=$5
        `, [name, phone, cpf, birthday, id]);

        res.sendStatus(200);
        
    } catch (error) {
        res.status(500).send(error);
    }
}