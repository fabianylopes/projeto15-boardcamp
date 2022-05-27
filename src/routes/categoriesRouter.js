import { Router } from "express";

import { getCategories, setCategories } from "../controllers/categoriesController.js";
import { validateCategory, validateName } from "../middlewares/validateCategory.js";

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', validateCategory, validateName, setCategories);

export default categoriesRouter;