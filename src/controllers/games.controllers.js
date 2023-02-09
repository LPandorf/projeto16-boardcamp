import { connection } from "../database.js";


export async function create(req, res) {
    const {name, image, stockTotal, pricePerDay}=res.locals.game;

    try{
        await connection.query(
            'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
            [name, image, stockTotal, pricePerDay]
        );

        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function findAll(req, res) {
    try{
        const {rows}= await connection.query("SELECT * FROM games;");

        res.send(rows);
    }catch(err){
        res.status(500).send(err.message);
    }
}