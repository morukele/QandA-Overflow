import { PORT } from "./config";
import express, { Express, Request, Response } from "express";
import DataRepository from "./data/DataRepository";
import { Home, Status } from "./routes";

const app: Express = express();

app.use(express.json());

app.use(Home());
app.use(Status());

app.listen(PORT, () => {
	console.log(`App up and listening on port: ${PORT}`);
});
