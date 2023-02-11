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
    
    try{
        const costumerRentals=await connection.query(
            'SELECT * FROM rentals JOIN customers ON rentals."customerId"=customers.id'
        )
        
        const rentedGames=await connection.query(
            'SELECT * FROM rentals JOIN games ON rentals."gameId"=games.id'
        )
        
        const joined= costumerRentals.rows.map((x)=>{
            return({
                id: x.id,
                customerId: x.customerId,
                gameId: x.gameId,
                rentDate: x.rentDate,
                daysRented: x.daysRented,
                returnDate: x.returnDate,
                originalPrice: x.originalPrice,
                delayFee: x.delayFee,
                customer: {
                    id: x.customerId,
                    name: x.name,
                },
                game: {
                    id: x.gameId,
                    name: rentedGames.rows[x.gameId-1].name
                }
            })
        })
        console.log("4")
        /* const {rows} = customerId ? await connection.query(
                global+'WHERE "customerId"=$1',
                [Number(customerId)]
            ): gameId ?  await connection.query(
                global+'WHERE "gameId"=$1',
                [Number(gameId)]
            ):  joined;
        console.log(rows); */
        //res.send(rows);       
        res.send(joined);
        //res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function gameReturn(req, res){
    
}

export async function exclude(req, res){
    
}