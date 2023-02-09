import { Router } from "express";
import { create, findAll } from "../controllers/games.controllers.js";
import { validSchemaJogos } from "../middlewares/games.middleware.js";

const router=Router();

router.post("/games", validSchemaJogos, create);
router.get("/games", findAll);

export default router;