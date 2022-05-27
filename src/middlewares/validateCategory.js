import connection from "../db.js";
import categorySchema from "../schemas/categorySchema.js";

export async function validateCategory(req, res, next){
    const category = req.body;

    const validation = categorySchema.validate(category);
    if(validation.error){
        return res.sendStatus(400);
    }
    next();
}

export async function validateName(req, res, next){
    const { name } = req.body;

    try {
        
       const existingName = await connection.query(`SELECT * FROM categories WHERE name=$1`, [name]);
       if(existingName){
           return res.status(409).send('Categoria já cadastrada!');
       }

       next();

    } catch (error) {
        return res.status(500).send(error);
    }
}

