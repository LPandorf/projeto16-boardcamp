import { connection } from "../database.js";

export async function create(req, res){
    const {customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee}=res.locals.rental;
    
    try{
        await connection.query(
            'INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)',
            [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee]
        );

        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function findAll(req, res){
    const {customerId,gameId}=req.query;

    const global=`
        SELECT rentals.*
        FROM rentals
    `;

    /* const global=`
        SELECT rentals.*,

    ` */

    try{
        const {rows} = customerId ? await connection.query(
                global+'WHERE "customerId"=$1',
                [Number(customerId)]
            ): gameId ?  await connection.query(
                global+'WHERE "gameId"=$1',
                [Number(gameId)]
            ):  await connection.query(global);

        res.send(rows);
        //res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function gameReturn(req, res){
    
}

export async function exclude(req, res){
    
}