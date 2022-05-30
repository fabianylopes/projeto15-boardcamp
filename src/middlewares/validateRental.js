import connection from "../db.js";
import rentalSchema from "../schemas/rentalSchema.js";

export async function validateRental(req, res, next){
    const rental = req.body;

    const validation = rentalSchema.validate(rental);
    if(validation.error){
        return res.sendStatus(400);
    }
    next();
}

export async function validateDeleteAndReturnRental(req, res, next){
    const { id } = req.params;

    try {
        const existingId = await connection.query(`
          SELECT * FROM rentals WHERE id=$1
        `, [id]);

        if(existingId.rowCount === 0){
          return res.status(404).send("Id não encontrado!");
        }

        const { rows: rentalReturned } = await connection.query(`
          SELECT "returnDate" FROM rentals WHERE id=$1
        `, [id]);

        if(rentalReturned[0].returnDate !== null){
          return res.status(400).send('Jogo já devolvido!');
        }

        next();
      
    } catch (error) {
      res.status(500).send(error);
    }
}