import { Router } from "express";
import { create, findAll, gameReturn, exclude } from "../controllers/rentals.controllers.js";
import { gameIsAvailable, validSchemaRentals, validSchemaRentalsRequests } from "../middlewares/rentals.middlewares.js";

const router=Router();

router.post("/rentals", validSchemaRentalsRequests, validSchemaRentals, gameIsAvailable, create);
router.post("/rentals/:id/return", gameReturn);
router.get("/rentals", findAll);
router.delete("/rentals/:id", exclude);

export default router;