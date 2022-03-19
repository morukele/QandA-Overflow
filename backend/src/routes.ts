import { Router, Request, Response } from "express";

const router = Router();

export const Home = () => {
	return router.get("/", (req: Request, res: Response) => {
		res.status(200).send("Hello World");
	});
};

export const Status = () => {
	return router.get("/health", (req: Request, res: Response) => {
		res.status(200).send("Server up and running");
	});
};
