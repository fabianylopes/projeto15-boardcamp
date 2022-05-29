import { Router } from "express";

import { getRentals, setRental } from "../controllers/rentalsController.js";
import { validateRental } from "../middlewares/validateRental.js";

const rentalRouter = Router();

rentalRouter.get('/rentals', getRentals);
rentalRouter.post('/rentals', validateRental, setRental);

export default rentalRouter;