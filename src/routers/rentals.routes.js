import { Router } from "express";
import { create, findAll, gameReturn, exclude } from "../controllers/rentals.controllers.js";
import { gameIsAvailable, validSchemaRentals } from "../middlewares/rentals.middlewares.js";

const router=Router();

router.post("/rentals", validSchemaRentals, gameIsAvailable, create);
router.post("/rentals/:id/return", gameReturn);
router.get("/rentals", findAll);
router.delete("/rentals/:id", exclude);

export default router;