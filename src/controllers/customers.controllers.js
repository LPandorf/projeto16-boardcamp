import { connection } from "../database.js";


export async function create(req, res) {
    const {name, phone, cpf, birthday}=res.locals.customer;

    try{
        await connection.query(
            "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
            [name, phone, cpf, birthday]
        )

        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function findAll(req, res) {
    const {cpf}=req.query;

    try{
        const customers= await connection.query("SELECT * FROM customers");

        res.send(customers.rows);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function findById(req, res) {
    const {id}= req.params;

    try{
        const {rows}= await connection.query(
            "SELECT * FROM customers WHERE id=$1",
            [id]
        );

        if(rows.length===0){
            return res.sendStatus(404);
        }

        res.send(rows[0]);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function update(req, res) {
    const {name, phone, cpf, birthday}=res.locals.customer;
    const {id}=req.params;

    const cpfCustomerExists= await connection.query(
        "SELECT * FROM customers WHERE cpf=$1",
        [cpf]
    );

    if(cpfCustomerExists.rowCount!==0 && cpfCustomerExists.rows[0].id!==Number(req.params.id)){
        return res.sendStatus(409);
    }

    try{
        await connection.query(
            "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5",
            [name, phone, cpf, birthday, id]
        )

        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message);
    }
}