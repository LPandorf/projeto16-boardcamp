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
        res.send(joined);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function gameReturn(req, res){
    const {id}=req.params;
    
    try{
        const rentals=await connection.query(
            "SELECT * FROM rentals WHERE id=$1",
            [id]
        );

        const rental=rentals.rows[0];

        if(rentals.rowCount===0){
            return res.sendStatus(404);
        }
            
        if(rental.returnDate){
            return res.sendStatus(400);
        }
            
        const time= new Date().getTime()- new Date(rental.rentDate).getTime();
        const timeInDays= Math.floor(time/86400);
        
        let delayFee=0;

        if(timeInDays>rental.daysRented){
            const delay=timeInDays-rental.daysRented;
            delayFee=delay*rental.originalPrice;
        }

        await connection.query(
            'UPDATE rentals SET "returnDate"=NOW(), "delayFee"=$1 WHERE id=$2',
            [delayFee, id]
        )
        
        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function exclude(req, res){
    
}