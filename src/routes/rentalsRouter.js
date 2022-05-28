import { Router } from "express";

import { getRentals } from "../controllers/rentalsController.js";

const rentalRouter = Router();

rentalRouter.get('/rentals', getRentals);

export default rentalRouter;