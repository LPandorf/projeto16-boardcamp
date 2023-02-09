import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import gamesRoutes from "./routers/games.routes.js";

const app=express();

app.use(cors());
app.use(express.json());

app.use(gamesRoutes);

const port=process.env.PORT;
app.listen(port, ()=>console.log(`listening on ${port}`));