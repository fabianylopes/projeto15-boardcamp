import dayjs from "dayjs";

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

  export async function setRental(req, res){
    const { customerId, gameId, daysRented } = req.body;

      const rentDate = dayjs().format('YYYY-MM-DD');
      const returnDate = null;
      const delayFee = null;

    try {

      const existingCustomer = await connection.query(`
      SELECT id FROM customers WHERE id=$1
      `, [customerId]);
      
      if(!existingCustomer){
        return res.sendStatus(400);
      }
      
      const existingGame = await connection.query(`
        SELECT id FROM games WHERE id=$1
      `, [gameId]);
      
      if(!existingGame){
        return res.sendStatus(400);
      }

      const {rows: pricePerDay} = await connection.query(`
        SELECT * FROM games WHERE id=$1
      `, [gameId]);


      const rentalPrice = pricePerDay[0].pricePerDay;

      const originalPrice = rentalPrice * daysRented;

      await connection.query(`
        INSERT INTO rentals 
          ("customerId", "gameId", "rentDate", 
          "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);
        
      
      res.sendStatus(201);
      
    } catch (error) {
      res.status(500).send(error);
    }
  }

  export async function returnRental(req, res){
    const { id } = req.params;

    const returnDate = dayjs().format('YYYY-MM-DD');
    const delayFee = null;
    
    try {

      const {rows: rentDate} = await connection.query(`
        SELECT * FROM rentals WHERE id=$1
      `, [id]);

      const initialDate = rentDate[0].rentDate;

      const {rows: daysRented} = await connection.query(`
        SELECT * FROM rentals WHERE id=$1
      `, [id]);

      const days = daysRented[0].daysRented;
      
      const {rows: originalPrice} = await connection.query(`
        SELECT * FROM rentals WHERE id=$1
      `, [id]);

      const price = originalPrice[0].originalPrice;

      const difference = dayjs(returnDate).diff(dayjs(initialDate), 'day');
      

      if(days < difference){
        const delayDays = difference - days; 
        
        delayFee = delayDays * (price / daysRented);

      }

      await connection.query(`
        UPDATE rentals 
        SET "returnDate"=$1, "delayFee"=$2 
        WHERE id=$3
      `, [returnDate, delayFee, id])

      res.sendStatus(200);

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }

  }

  export async function deleteRental(req, res){
    const { id } = req.params;

    try {
        await connection.query(`
          DELETE FROM rentals WHERE id=$1
        `, [id]);

      res.sendStatus(200);
      
    } catch (error) {
      res.status(500).send(error);
    }

  }