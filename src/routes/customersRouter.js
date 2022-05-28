import { Router } from "express";

import { getCustomer, getCustomers, setCustomer, updateCustomer } from "../controllers/customersController.js";
import { validateCpf, validateCustomer } from "../middlewares/validateCustomer.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomer);
customersRouter.post('/customers', validateCustomer, validateCpf, setCustomer);
customersRouter.put('/customers/:id', validateCustomer, updateCustomer);

export default customersRouter;