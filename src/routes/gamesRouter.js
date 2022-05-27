import { Router } from "express";
import { getGames, setGames } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', setGames);


export default gamesRouter;