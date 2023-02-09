import { Router } from "express";
import { create, findAll, findById, update } from "../controllers/customers.controllers.js";
import { validSchemaCustomer, validSchemaCustomerForUpdate } from "../middlewares/customers.middlewares.js";

const router=Router();

router.post("/customers", validSchemaCustomer, create);
router.get("/customers", findAll);
router.get("/customers/:id", findById);
router.put("/customers/:id", validSchemaCustomerForUpdate, update);

export default router;