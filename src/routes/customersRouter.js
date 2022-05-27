import { Router } from "express";
import { getCustomers, setCustomer } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.post('/customers', setCustomer);

export default customersRouter;