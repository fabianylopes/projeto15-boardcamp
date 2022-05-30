import { Router } from "express";

import { deleteRental, getRentals, returnRental, setRental } from "../controllers/rentalsController.js";
import { validateDeleteAndReturnRental, validateRental } from "../middlewares/validateRental.js";

const rentalRouter = Router();

rentalRouter.get('/rentals', getRentals);
rentalRouter.post('/rentals', validateRental, setRental);
rentalRouter.post('/rentals/:id/return', validateDeleteAndReturnRental, returnRental);
rentalRouter.delete('/rentals/:id', validateDeleteAndReturnRental, deleteRental);

export default rentalRouter;