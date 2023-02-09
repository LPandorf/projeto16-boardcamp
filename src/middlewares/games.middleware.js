import { connection } from "../database.js";
import {gameSchema} from "../schemas/games.schema.js";

export async function validSchemaJogos(req,res,next){
    const game=req.body;

    const {error}= gameSchema.validate(game,{abortEarly:false});

    if(error){
        const errors=error.details.map((detail)=>detail.message);
        return res.status(400).send({errors});
    }

    const gameNameExists= await connection.query(
        "SELECT * FROM games WHERE name=$1",
        [game.name]
    );
    if(gameNameExists.rowCount!==0){
        return res.sendStatus(409);
    }

    res.locals.game=game;
    next();
}