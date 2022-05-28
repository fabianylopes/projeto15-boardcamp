import connection from "../db.js";

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query;
  
    try {
      const params = [];
      let str = '';
  
      if (customerId) {
        params.push(customerId);
        str += `WHERE rentals."customerId"=$${params.length}`
      }
  
      if (gameId) {
        params.push(gameId);
        str += `WHERE rentals."gameId"=$${params.length}`
      }
  
      const rentals = await connection.query({
        text: `
          SELECT 
            rentals.*,
            customers.name AS customer,
            games.name,
            categories.*
          FROM rentals
            JOIN customers ON customers.id=rentals."customerId"
            JOIN games ON games.id=rentals."gameId"
            JOIN categories ON categories.id=games."categoryId"
          ${str}
        `,
        rowMode: "array"
      }, params);

      const result = rentals.rows.map(rentalsData);
  
      res.send(result);

    } catch (error) {
      res.status(500).send(error);
    }
  }

function rentalsData(obj) {
    const [
        id, customerId, gameId,
        rentDate, daysRented, returnDate,
        originalPrice, delayFee, customerName,
        gameName, categoryId, categoryName
      ] = obj;
    
      return {
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customer: {
          id: customerId,
          name: customerName
        },
        game: {
          id: gameId,
          name: gameName,
          categoryId,
          categoryName
        }
      }
  }