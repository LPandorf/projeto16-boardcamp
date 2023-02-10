import {customerSchema} from "../schemas/customers.schema.js";
import { connection } from "../database.js";

export async function validSchemaCustomer(req, res, next) {
    const customer=req.body;
  
    const {error}= customerSchema.validate(customer, {abortEarly:false});
    
    if(error){
        const errors=error.details.map((detail)=>detail.message);
        return res.status(400).send({errors});
    }
   
    const cpfCustomerExists= await connection.query(
        "SELECT * FROM customers WHERE cpf=$1",
        [customer.cpf]
    );

    if(cpfCustomerExists.rowCount!==0){
        return res.sendStatus(409);
    }

    res.locals.customer=customer;
    next();
}

export async function validSchemaCustomerForUpdate(req, res, next) {
    const customer=req.body;

    const {error}= customerSchema.validate(customer, {abortEarly:false});

    if(error){
        const errors=error.details.map((detail)=>detail.message);
        return res.status(400).send({errors});
    }

    res.locals.customer=customer;
    next();
}