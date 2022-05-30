import { Router } from "express";

import { deleteRental, getRentals, setRental } from "../controllers/rentalsController.js";
import { validateRental } from "../middlewares/validateRental.js";

const rentalRouter = Router();

rentalRouter.get('/rentals', getRentals);
rentalRouter.post('/rentals', validateRental, setRental);
rentalRouter.post('/rentals/:id/return')
rentalRouter.delete('/rentals/:id', deleteRental);

export default rentalRouter;