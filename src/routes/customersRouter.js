import { Router } from "express";
import { setCustomer } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.post('/customers', setCustomer);

export default customersRouter;