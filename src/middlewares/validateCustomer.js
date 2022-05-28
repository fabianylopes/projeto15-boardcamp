import connection from "../db.js";
import customerSchema from "../schemas/customerSchema.js";

export async function validateCustomer(req, res, next){
    const customer = req.body;

    const validation = customerSchema.validate(customer);
    if(validation.error){
        return res.sendStatus(400);
    }
    next();
}

export async function validateCpf(req, res, next){
    const { cpf } = req.body;

    try {
        
       const existingCPF = await connection.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);
       if(!existingCPF){
           return res.status(409).send('CPF já cadastrado!');
       }

       next();

    } catch (error) {
        return res.status(500).send(error);
    }
}